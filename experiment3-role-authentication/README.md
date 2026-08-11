# Experiment 3 - Role-Based Authentication & Route Protection

This React project implements the concepts listed in the Experiment 3 PDF:

- JWT authentication (simulated)
- Token generation and decoding
- Token storage
- Axios request interceptor
- Axios response interceptor
- Token expiry and refresh mechanism
- Role-Based Access Control (RBAC)
- Protected routes
- Conditional UI rendering based on roles
- Unauthorized access handling

## Requirements

Install Node.js first.

## Run the project

Open this project folder in VS Code terminal:

```bash
npm install
npm run dev
```

Then open the localhost URL shown by Vite.

## Demo accounts

Admin:
- username: admin
- password: admin123

Editor:
- username: editor
- password: editor123

Viewer:
- username: viewer
- password: viewer123

## What to demonstrate in viva

1. Login creates a simulated JWT.
2. JWT payload contains userId, role, name and exp.
3. Token is stored in localStorage for this classroom simulation.
4. ProtectedRoute prevents unauthenticated access.
5. RoleRoute prevents users from opening pages outside their role.
6. Admin can access Admin and Editor pages.
7. Editor can access Editor page.
8. Viewer can access Dashboard/Profile only.
9. Conditional rendering hides or shows buttons based on role.
10. Axios request interceptor attaches `Authorization: Bearer <token>`.
11. Token expiry is detected.
12. Refresh token creates a new access token.
13. A 401 response is handled by the response interceptor.

## Important security note

This is a frontend classroom simulation based on the supplied experiment. The PDF itself describes simulated token generation. A production application should not generate/sign JWTs in the browser or treat localStorage as a secure token store. Authentication and authorization must ultimately be enforced by a trusted backend.
