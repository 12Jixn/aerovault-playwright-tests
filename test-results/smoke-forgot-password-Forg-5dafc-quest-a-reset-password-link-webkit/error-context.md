# Page snapshot

```yaml
- alert:
  - img
  - text: Reset password link has been sent.
- button "close"
- progressbar "notification timer"
- alert:
  - img
  - text: Reset password link sent successfully.
- button "close"
- progressbar "notification timer"
- main:
  - img "AeroVault Logo"
  - heading "Forgot Password" [level=6]
  - heading "Enter Email" [level=6]
  - textbox: gracemac1027@gmail.com
  - button "Submit"
  - heading "Go back to login page" [level=6]
- button "Open Tanstack query devtools":
  - img
```