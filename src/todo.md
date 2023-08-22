## todo

- [ ] user joins server, bot has button to verify themselves
- [ ] clicks button, gets sent message like 'verify your school info with this command `!verify [school_email] [cwid]`'
- [ ] recieves command + communicates with my auth system to verify enrollment (probably through canvas - have to read docs for this)
- [ ] based on classes prof. is teaching that semester (which can be updated through json file - github actions every four months) we can determine which classes the student is enrolled in (rememebr class + section number)
- [ ] with the classes they are enrolled in they get access to those channels w/ the section.

another idea (not ideal lol)


just have a simple roster in that he holds w/cwid and name or even email
and when they do `!verify [school_email] [cwid]` the script checks to see if the person is on the roster and if they are, (**if** theres a section for signed in courses we can equate that with the key/pair value of the discord channel, then making it visible)
