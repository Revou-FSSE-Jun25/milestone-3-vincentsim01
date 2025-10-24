import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function postCookie(req: Request) {


  const { email, password, access_token, refresh_token } = await req.json();

   const getUserRole = (email: string): 'admin' | 'user' => {
    return email === 'john@mail.com' ? 'admin' : 'user';
  };

  const userRole = getUserRole(email);

  if (email === 'john@mail.com' && password === '1234') {
    const token = 'sample_jwt_token_abc123';

    // ✅ cookies() is synchronous
    const cookieStore = cookies();

    // ✅ Set secure cookie
    (await cookieStore).set({
      name: 'auth-token',
      value: access_token,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',  // Use 'lax' unless cross-site needed
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

        (await cookieStore).set({
      name: 'refresh-token',
      value: refresh_token,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',  // Use 'lax' unless cross-site needed
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });


            (await cookieStore).set({
      name: 'email',
      value: email,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',  // Use 'lax' unless cross-site needed
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });


                (await cookieStore).set({
      name: 'user-role',
      value: userRole,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',  // Use 'lax' unless cross-site needed
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}