import { auth } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // 1. Get the session using the current request headers
    const session = await auth.api.getSession({
        headers: event.request.headers
    });

    // 2. Save session in locals so we can use it in layouts/pages
    event.locals.session = session;
    event.locals.user = session?.user;

    return resolve(event);
};