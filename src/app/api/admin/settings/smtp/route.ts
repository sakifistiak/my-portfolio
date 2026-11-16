import {NextRequest,NextResponse} from 'next/server';
import {verifyAdminRequest} from '@/lib/admin-api';
import {getSupabaseAdmin} from '@/lib/supabase';
export async function GET(request:NextRequest){
 if(!verifyAdminRequest(request))return NextResponse.json({error:'Unauthorized'},{status:401});
 const {data}=await getSupabaseAdmin().from('app_settings').select('value').eq('key','smtp').maybeSingle();
 const v=data?.value||{};
 return NextResponse.json({host:v.host||'',port:v.port||587,secure:!!v.secure,user:v.user||'',from_email:v.from_email||'',from_name:v.from_name||'Sakif Istiak',notification_email:v.notification_email||'',configured:!!v.password});
}
export async function PUT(request:NextRequest){
 if(!verifyAdminRequest(request))return NextResponse.json({error:'Unauthorized'},{status:401});
 const body=await request.json();
 const host=String(body.host||'').trim(),user=String(body.user||'').trim(),password=String(body.password||''),from_email=String(body.from_email||'').trim(),notification_email=String(body.notification_email||'').trim(),port=Number(body.port||587);
 if(!host||!user||!password||!/^\S+@\S+\.\S+$/.test(from_email)||!/^\S+@\S+\.\S+$/.test(notification_email)||!Number.isInteger(port)||port<1||port>65535)return NextResponse.json({error:'Enter valid SMTP host, port, credentials and email addresses.'},{status:400});
 const value={host,port,secure:!!body.secure,user,password,from_email,from_name:String(body.from_name||'Sakif Istiak'),notification_email};
 const {error}=await getSupabaseAdmin().from('app_settings').upsert({key:'smtp',value});
 if(error)return NextResponse.json({error:'Could not save SMTP settings.'},{status:500});
 return NextResponse.json({success:true});
}
