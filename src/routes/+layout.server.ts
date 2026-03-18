import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    // Redirect anyone who visits "/" to "/en"
    throw redirect(302, '/en');
};