## QA Checklist

Someone hacked our login page and might have changed the code in some way. You are tasked with finding out what they did. Originally, this checklist was used to create the website and it was checked and true. It is your job to find out if that is still the case.

Our most important customers use Google Chrome, so start there when making sure that things work as expecteed.

We have a couple of test users that you have at your disposal:

1. username: "admin", password: "12345"
2. username: "user1", password: "Password1"
3. username: "user2", password: "Password2"

There are 3 different versions of our website, please try each version and see what is wrong.

**Version 1**:
https://gopiss.netlify.app?v=1

**Version 2**:
https://gopiss.netlify.app?v=2

**Version 3**:
https://gopiss.netlify.app?v=3

### Functionality

- [ ] Verify that a user can login with a valid username and valid password.
- [ ] Verify if a user cannot login with a valid username and an invalid password.
- [ ] Verify that it says “Invalid username or password!” somewhere for invalid login.
- [ ] Verify if the data in password field is either visible as asterisk or bullet signs.
- [ ] Verify if the ‘Enter’ key of the keyboard is working correctly on the login page.
- [ ] Verify that the login button attempts a login.
- [ ] Logging in will the take the user to /LoggedIn
- [ ] Verify that a user that is logged in to the correct account.
- [ ] Verify that the password is case sensitive

### Reliability

- [ ] If an error occurs, the user can attempt to login again.
- [ ] Logging in should behave the same way every time.

### Usability

- [ ] Verify that the font is easy to read.
- [ ] Verify that the contrast of text color and background has a high enough contrast
- [ ] Verify that the layout of the login page is as you would expect.
- [ ] Verify that the labels are useful.
- [ ] Verify that the page is not really ugly.

### Efficiency

- [ ] Verify the time taken to login is less than 1 second.
- [ ] Verify that logging in is not unneccessarily complicated.

### Portability

- [ ] Verify that the login page works on Google Chrome.
- [ ] Verify that the login page works on Microsoft Edge.
- [ ] Verify that the login page works on Safari.
- [ ] Verify that the login page works on Firefox.
- [ ] Verify that the login page works on a smart phone.

nån människa hade fel,
alla människor hade fel
inga människor hade fel
