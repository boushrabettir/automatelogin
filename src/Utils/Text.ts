const positiveResponses: string[] = [
    "You're making great progress. Keep it up!",
    "Believe in yourself, and you'll achieve great results.",
    "Hard work always pays off in the end.",
    "Stay focused and stay positive. You've got this!",
    "Every small step counts toward your goals.",
    "Learning is a journey; enjoy every moment of it.",
    "You're one step closer to success with every study session.",
    "Your dedication to studying will open doors to new opportunities.",
    "Keep your goals in sight and keep pushing forward.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Challenges are just opportunities in disguise. Embrace them!",
    "Learning today for a brighter tomorrow.",
    "Your commitment to studying is inspiring.",
    "Effort is the seed from which success grows.",
    "Stay positive, stay strong, and keep studying.",
    "In the end, it will all be worth it.",
    "Don't stop when you're tired; stop when you're done.",
    "Every study session is a step toward mastery.",
    "Stay motivated, stay positive, and keep learning.",
    "Learning is the key to unlocking your full potential.",
    "Your hard work today sets the foundation for your future.",
    "Stay determined, and you'll achieve greatness.",
    "Keep calm and study on.",
    "You're capable of achieving anything you set your mind to.",
    "Every moment spent studying is an investment in yourself.",
    "Success is a journey, not a destination. Enjoy the ride!",
    "Your effort today will lead to success tomorrow.",
    "With each study session, you become wiser and stronger.",
    "Study with purpose, and success will follow.",
    "You're on the path to becoming the best version of yourself.",
    "Don't let today's challenges deter you from tomorrow's success.",
    "Keep your eyes on the prize and keep studying hard.",
    "Your dedication to learning is truly admirable.",
    "You're creating a brighter future with every page you turn.",
    "The harder you work, the luckier you become.",
];
  

export const chooseResponse = (): string => {

    let randomIndex = Math.floor(Math.random() * positiveResponses.length);
    return positiveResponses[randomIndex];
}