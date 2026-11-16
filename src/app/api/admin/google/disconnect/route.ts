import { NextRequest,NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-api';
import { getSupabaseAdmin } from '@/lib/supabase';
export async function POST(request:NextRequest){
 if(!verifyAdminRequest(request))return NextResponse.json({error:'Unauthorized'},{status:401});
 const {error}=await getSupabaseAdmin().from('app_settings').delete().eq('key','google_calendar');
 if(error)return NextResponse.json({error:'Could not disconnect Google Calendar.'},{status:500});
 return NextResponse.json({success:true});
}
