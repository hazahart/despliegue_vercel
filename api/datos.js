import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const { method } = req;

    if (method === 'GET') {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*');

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Método ${method} no permitido` });
}