import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  const { email, password, role } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  // check if user already exists
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert({ email, password_hash: hashedPassword, role: role || 'user' })
    .select()
    .single();

  if (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Unable to create user' }, { status: 500 });
  }

  return NextResponse.json({ id: data?.id, email: data?.email, role: data?.role });
}
