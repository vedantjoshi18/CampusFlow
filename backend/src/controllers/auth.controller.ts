import type { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, branch, year, subjects } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // 1. Register with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ success: false, message: authError.message });
    }

    // 2. Update profile with extra info
    // (Assuming the handle_new_user trigger has already created the row)
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ name, phone, branch, year, subjects })
        .eq('id', authData.user.id);

      if (profileError) {
         console.error('Profile update error:', profileError);
      }
    }

    res.status(201).json({ success: true, user: authData.user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ success: false, message: error.message });
    }

    res.json({ success: true, token: data.session?.access_token, user: data.user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
