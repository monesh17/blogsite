import { withIronSession } from "next-iron-session";
export const getUserFromServerSession =async (req,res) => {
    console.log('user logged in');
    const userDetails = withIronSession(
        () => {
            const user = req.session.get("user");

            if (!user) {
                res.statusCode = 404;
                res.end();
                return { props: {} };
            }

            return {
                props: { user }
            };
        },
        {
            password: process.env.APPLICATION_SECRET,
            cookieName: "blog_user",
            // if your localhost is served on http:// then disable the secure flag
            /* cookieOptions: {
              secure: process.env.NODE_ENV === "production",
            }, */
        }
    );
    console.log('user details from api ', userDetails);
    return userDetails;
};