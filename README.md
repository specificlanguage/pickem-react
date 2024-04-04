# Pickems

## What's a "pickem?"

Pick'ems are a fun, lighthearted way for spectators to predict outcomes of games throughout the season, without putting any money down. This isn't sportsbetting, and there's no prize at the end, just something lighthearted to keep your head in the game, and compete against your friends.

## What's this?

This is a web app that allows you to make picks on baseball games throughout the season, with your friends and compare with people around the world. This is mostly a side project to learn new things, but I love baseball, and I'm sure people would love to compete with their friends in something as simple as this.

This is currently still a work in progress, but a publicly usable website will be available soon.

## Why is this cool?

- 💸 - **There's no money involved** -- no sportsbetting! It's just for fun!
- 📜 - **No more Google forms!** -- There's no long forms, but personalized! Just log in and make your picks!
- 🎲 - **Randomized games!** -- You'll get four games randomly chosen per day, so you should keep up around the league!
- ⚾ - Games updated from MLB in real(-ish) time!
- 📆 - Pick games every day, or for lazier people, pick over a series (feature coming soon)!
- 👥 - For diehard fans, compete on the leaderboard or with your friends and "clubs!" (features coming soon)!

## How can I play?

Everyone will have four (or sometimes less) games to predict per day, and your score is measured by how many picks of those will be correct. At least one of them will be a game from "your favorite team", a team that you choose when creating your account (although you can change it later).

You can also pick arbitrary games on the status screen, however those won't count towards your score.

## How can I set this up?

If you'd like to work on this yourself:

1. Clone this repository, 
   1. and if you'd like to contribute to the backend, set up [the Pick'em API](https://github.com/specificlanguage/PickemAPI),
2. Run `pnpm install` to install dependencies,
3. Use a Clerk dev account to obtain a publishable key and add it to `.env` (especially if you are using the API)
4. Run `pnpm dev` to run the app in development.

Not all the steps might be here, for example, you may need to setup a database, which you can do through the [API](https://github.com/specificlanguage/PickemAPI). Most functionality requires the API for this to work.
