import {NextRequest,NextResponse} from 'next/server';
import {verifyAdminRequest} from '@/lib/admin-api';
import {getSupabaseAdmin} from '@/lib/supabase';
export async function GET(request:NextRequest){
 if(!verifyAdminRequest(request))return NextResponse.json({error:'Unauthorized'},{status:401});
 const {data,error}=await getSupabaseAdmin().from('bookings').select('*').order('start_at',{ascending:false}).limit(200);
 if(error)return NextResponse.json({error:'Could not load bookings.'},{status:500});
 return NextResponse.json({bookings:data||[]});
}
