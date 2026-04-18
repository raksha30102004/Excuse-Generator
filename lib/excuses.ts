export type Tone = "formal" | "casual" | "humorous";
export type Situation = "late" | "deadline" | "event";

const templates: Record<Situation, Record<Tone, string[]>> = {
  late: {
    formal: [
      "I sincerely apologize for my tardiness. There was a major water main break on my usual route this morning, which forced a complete road closure. I had to reroute through an unfamiliar part of the city, and my GPS kept recalculating due to additional detours. I left home with plenty of time to spare, but unfortunately these circumstances were entirely beyond my control.",
      "Please accept my deepest apologies for arriving late. My building's elevator malfunctioned this morning, trapping me between floors for nearly twenty minutes. Building maintenance had to be called, and by the time I was able to leave, traffic had already peaked. I understand the inconvenience this causes and it will not happen again.",
    ],
    casual: [
      "So, funny story — my neighbor's dog somehow got into my apartment this morning when I opened the door to leave. It took me a solid twenty minutes to lure it out with peanut butter while trying not to let my own cat escape. By the time I sorted that out, I'd missed my bus and had to wait for the next one. Absolutely chaotic morning.",
      "Okay so I was fully ready on time, shoes on and everything, and then I spilled an entire coffee down my shirt. Had to change, clean the mess, and of course that was the one morning I couldn't find anything clean. Add in the traffic from that fender bender on Main Street and here we are. My bad!",
    ],
    humorous: [
      "I actually left early today, which I think confused the universe. My car wouldn't start, my backup bus drove right past me, and a squirrel stole my granola bar while I was waiting for a ride. I'm starting to think punctuality has a restraining order against me. On the bright side, at least I have a great story.",
      "My alarm went off on time. I woke up on time. I was winning. Then I made the fatal mistake of sitting on my bed 'just for a second' and woke up 40 minutes later with my cat on my chest judging me. The commute was fine though, so really this is between me and the bed.",
    ],
  },
  deadline: {
    formal: [
      "I regret to inform you that I was unable to complete the deliverable by the agreed-upon deadline. Yesterday evening, my workstation experienced a critical hard drive failure, resulting in the loss of several hours of unsaved progress. While I was able to recover most files from cloud backups, the reconstruction process has set me back considerably. I am actively working to finalize everything and expect to deliver by end of day tomorrow.",
      "I want to sincerely apologize for not meeting the deadline. A family emergency arose unexpectedly over the weekend that required my immediate and full attention. I had made significant progress beforehand, but the remaining work requires focused time I simply did not have. I take full responsibility and have already blocked off time today to bring this to completion.",
    ],
    casual: [
      "So I was actually almost done last night, like 90% there, and then my laptop decided to install a massive update and restart itself. It took over an hour, and by the time it came back, I was too fried to finish with fresh eyes. I'm wrapping it up right now though — give me just a few more hours and it'll be solid.",
      "Real talk — I totally underestimated how long the research portion would take. I went down a rabbit hole trying to make sure everything was accurate, and before I knew it, I'd blown through my timeline. The good news is the quality is going to be way better than expected. Just need a little more time to pull it all together.",
    ],
    humorous: [
      "I would've finished on time, but my Wi-Fi staged a full revolt at 11 PM last night. I spent an hour power-cycling the router, whispering sweet nothings to it, and even threatening it. Nothing worked. By the time it came back, my brain had already clocked out for the night. Honestly, I think my internet provider owes you an apology too.",
      "Here's what happened: I sat down to finish the project, opened my laptop, and was immediately ambushed by a 3-hour software update I couldn't cancel. While waiting, I accidentally started watching a documentary about octopuses. Did you know they have three hearts? Anyway, I'm refocusing now and will have it done ASAP.",
    ],
  },
  event: {
    formal: [
      "Unfortunately, I will not be able to attend the event as planned. A prior professional commitment that I was not initially aware of has surfaced, and it directly conflicts with the scheduled time. I explored the possibility of rearranging my calendar, but the overlap is unavoidable. Please know that I very much wanted to attend and I hope to be included in future gatherings.",
      "I regret to inform you that an urgent family matter has come up that requires my presence this weekend. I had been looking forward to the event and made every effort to find an alternative arrangement, but the situation demands my immediate attention. I sincerely apologize for any inconvenience and would love to catch up afterward to hear how it went.",
    ],
    casual: [
      "Ah man, I really wanted to make it but my parents just called and they're coming to visit this weekend — total surprise. I haven't seen them in months so I kinda have to be around. I'm bummed to miss it though. Take lots of pics and let's definitely plan something soon so I can make it up!",
      "So I just realized I double-booked myself like an idiot. I promised my friend I'd help them move this weekend ages ago and completely forgot when I said yes to this. I feel terrible about it but I can't bail on them now. Next time for sure — save me a spot!",
    ],
    humorous: [
      "I'd absolutely love to come, but I recently entered into a binding agreement with my couch involving a new Netflix series and a truly irresponsible amount of snacks. My lawyer (also my cat) advises that breaking this contract could have serious emotional consequences. I hope you understand. Please enjoy a drink in my honor.",
      "I ran the numbers and unfortunately my social battery is at about 4% right now. If I attend, there's a high probability I'll just stand in the corner holding a drink and staring into the middle distance. For everyone's sake, I think it's best I sit this one out, recharge, and come back at full power next time.",
    ],
  },
};

export function generateExcuse(situation: Situation, tone: Tone): string {
  const options = templates[situation][tone];
  return options[Math.floor(Math.random() * options.length)];
}

export const situations: { value: Situation; label: string }[] = [
  { value: "late", label: "🕐 Running Late" },
  { value: "deadline", label: "📅 Missed Deadline" },
  { value: "event", label: "🎉 Skip an Event" },
];

export const tones: { value: Tone; label: string }[] = [
  { value: "formal", label: "👔 Formal" },
  { value: "casual", label: "😎 Casual" },
  { value: "humorous", label: "😂 Humorous" },
];
