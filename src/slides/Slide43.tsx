"use client";

import { motion } from "framer-motion";

const paragraphs = [
  "hey baby, i wont tell u when i wrote this (hehe) u guess nalang later\u2026",
  "but anyways, do u remember back when we were playing minecraft on our server? this was before we even met for the first time but honestly, that whole time that we were playing was the most chill and enjoyable time that i ever had on gaming until that point ( because im sure we'll have more of that in the future :D ). everytime that we played it together, everything just felt so relaxed. the late night sessions, getting to know each other more, all the stuff we built together. i didn't realize it then but looking back, those were some of my favorite days ever.",
  "the reason why i said all this is because im pretty certain this is the moment that i fell for you. every single session we had, the stuff we built together, getting to know more about each other through those late nights. all of it still holds dear in my memory.",
  "and honestly, you've changed a lot about me without even trying. before you i didn't really know how to open up, like at all. i thought that was just how i was. but then you would genuinely spam me with like five messages in a row when i went quiet, or randomly say \u201ci love u\u201d out of nowhere leaving me completely flustered. slowly, you just made it feel safe to show you how i actually felt. i didn't even notice it happening until it already did.",
  "and another thing. i know na ako lang din naman yung nagpaptagal ng \u201cno label\u201d natin and im sorry. you've been way more brave than me when it comes to feelings and i really hope na mainfluence mo din sakin yan. but yeah, im sorry.",
  "i want to be your boyfriend, i really do. being with my princess for these 8 months have made me certain that i want to be with you. i love it when im with you, doing stuff, or just being on a call in general. just having your presence and knowing that you're there puts my mind at ease and honestly boosts my productivity ( somehow LOL ).",
  "im certain of that but honestly, im still so scared on how to actually pull it off. im stuck between not wanting to prolong us not having a label for long, and also not fucking it up. i really want it to be a memorable experience and i hope that i dont fuck it up in the future.",
  "i love u always, and i hope na tayo na until the end :)",
];

export default function Slide43() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-start overflow-y-auto"
      style={{ backgroundColor: "#1A0A0A" }}
    >
      <div className="w-full max-w-2xl px-8 py-14 flex flex-col gap-6">
        {paragraphs.map((para, i) => (
          <motion.p
            key={i}
            style={{
              fontFamily: "var(--font-dancing)",
              fontSize: i === 0 ? "1.05rem" : "1.2rem",
              lineHeight: 1.75,
              color: "#FFF8F3",
              opacity: i === 0 ? 0.5 : 0.9,
              fontStyle: i === 0 ? "italic" : "normal",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: i === 0 ? 0.5 : 0.9, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 + i * 0.15, ease: "easeOut" }}
          >
            {para}
          </motion.p>
        ))}

        <motion.p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.65rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#FFF8F3",
            opacity: 0.2,
            marginTop: "2rem",
            textAlign: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          made with every message we ever sent
        </motion.p>
      </div>
    </div>
  );
}
