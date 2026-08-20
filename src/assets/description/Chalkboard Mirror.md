## Chalkboard Mirror
*This one is still a work in progress :(*
A Full-Stack Analytics platform built with React and FastAPI providing map visualizations of actions with D3.js in a football game on a game-by-game basis. Supports direct Whoscored URLs with Chalkboard support (hence the name :D) and - currently private - XML based match-action parsing from professional platforms like Wyscout and Sportsbase

![Chalkboard Demo](./Chalkboard%20Demo.mp4)

### Why did I bother building this?
I really love football but I think one of the hardest things to do as someone who also loves the underlying data within the sport is to find good data. Since getting such data is very expensive and usually only available to those at a professional club environment, people like me can't really get our hands onto anything more than 'goals', 'assists', and if we're lucky 'xG' and 'xA'.

If you've heard of Whoscored and their chalkboard functionality before, it's reasonable to think: why not just use that? It shows the same passing map in addition to a lot more data points. (If not, the chalkboard function is basically what you see in the demo above but with more filters on action types which are further split into subactions on an interactive pitch).

The only answer I have to that is that the functionality of the chalkboard on Whoscored is fundamentally for viewing only, the occasional filter but no way to actually extract the data out for personal use (which for the vast majority of users, is probably good enough). But I wanted to actually see the numbers maybe do some data analysis later for myself just for fun ;) 

So I found a way to extract the data from the chalkboard and the visualization on the demo is the result of testing the validity of the data that was extracted! 

There won't be a public-facing version just because I'm not sure if the way I extracted the data is something I can publicly distribute... so for the foreseeable future, it's just a personal football analytics playground
