import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Custom middleware logic can go here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If token exists, user is authorized
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard"],
};
