import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { success } from "zod";

const generateQRCode = ()=>{
    return `EVT-${Date.now()}-${Math.random().toString(36).substr(2,9).toUpperCase()}`
}

//! registration for an event
export const registerForEvent = mutation({
    args: {
        eventId: v.id("events"),
        attendeeName: v.string(),
        attendeeEmail: v.string()
    },
    handler: async (ctx , args)=>{
        const user = await ctx.runQuery(internal.users.getCurrentUser);
        const event = await ctx.db.get(args.eventId);
        if(!event){
            throw new Error("Event not found")
        }

        // Check if events is full
        if(event.registrationCount >= event.capacity){
            throw new Error("Event is full")
        }

          const identity = await ctx.auth.getUserIdentity();

        const existingRegistration = await ctx.db.query("registrations")
        .withIndex("by_event_user", (q)=> q.eq("eventId", args.eventId).eq("userId", identity.subject))
        .unique()

        if(existingRegistration){
            throw new Error("You are already registered for this event")
        }

        const qrCode = generateQRCode();
        const registrationId = await ctx.db.insert("registrations", {
            eventId: args.eventId,
            userId: identity.subject,
            attendeeName: args.attendeeName,
            attendeeEmail: args.attendeeEmail,
            qrCode: qrCode,
            checkedIn: false,
            status: "confirmed",
            registeredAt: Date.now()
        })

        // Update event registration count
        await ctx.db.patch(args.eventId, {
            registrationCount: event.registrationCount + 1
        })

        return registrationId;
    }
})

//! check user registered for that event or not 
export const checkRegistration = query({
       args:{eventId : v.id("events")},
       
       handler: async(ctx, args)=>{
         const user = await ctx.runQuery(internal.users.getCurrentUser)
           const identity = await ctx.auth.getUserIdentity();

         const registration = await ctx.db
         .query("registrations")
         .withIndex("by_event_user", (q)=>
        q.eq("eventId", args.eventId).eq("userId", identity.subject))
         .unique()

         return registration;
       }
})

//! fetch registrations detail
export const getMyRegistrations = query({
    handler: async (ctx)=>{
        const user = await ctx.runQuery(internal.users.getCurrentUser);
         const identity = await ctx.auth.getUserIdentity();

        const registrations = await ctx.db
        .query("registrations")
        .withIndex("by_user", (q)=> q.eq("userId", identity.subject))
        .order("desc")
        .collect();

    const registrationWithEvents = await Promise.all(
        registrations.map(async (reg) =>{
            const event = await ctx.db.get(reg.eventId);
            return {...reg , event}
        })
    )
      return registrationWithEvents;
    }
})


//! delete or cancel th registration:
export const cancelRegistration = mutation({
    args: {registrationId: v.id("registrations")},
    handler: async (ctx ,  args)=>{
        const user = await ctx.runQuery(internal.users.getCurrentUser);
        const identity = await ctx.auth.getUserIdentity();

        const registration = await ctx.db.get(args.registrationId);
        if(!registration){
            throw new Error("Registration not found");
        }

        if(registration.userId !== identity.subject){
            throw new Error("You can only cancel your own registrations")
        }

        const event = await ctx.db.get(registration.eventId);

        if(!event){
            throw new Error("Assosciated event not found")
        }

        // Update registration status:
        await ctx.db.patch(args.registrationId, {
            status:"cancelled"
        })

        // Decrement event registration count
        if(event.registrationCount > 0){
            await ctx.db.patch(registrationCount.eventId , {
                registrationCount: event.registrationCount - 1
            })
        }

        return  {success: true}
    }
})