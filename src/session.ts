import session from 'express-session';

export default session({
	secret: 'my-secret', // TODO make this more secure
	resave: false,
	saveUninitialized: true,
	name: 'x-session',
	cookie: {
		httpOnly: true,
		secure: true,
		sameSite: 'strict'
	}
});
