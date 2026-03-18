import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

const supportedLangs = ['en', 'ru', 'tk', 'tm', 'uz', 'kz', 'fr', 'de', 'zh', 'ja'];

export const load: LayoutServerLoad = async ({ params, locals }) => {
    const { lang } = params;

    // 1. Validate language
    if (!supportedLangs.includes(lang)) {
        throw error(404, 'Language not found');
    }

    // 2. Pass session and user from locals to the page
    return {
        lang,
        session: locals.session,
        user: locals.user
    };
};