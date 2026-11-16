import {NextRequest,NextResponse} from 'next/server';
import {createCipheriv,createHash,randomBytes} from 'node:crypto';
import {verifyAdminRequest} from '@/lib/admin-api';
import {getSupabaseAdmin} from '@/lib/supabase';
const key=()=>createHash('sha256').update(process.env.ADMIN_SESSION_SECRET||'').digest();
const encrypt=(value:string)=>{const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key(),iv);const data=Buffer.concat([cipher.update(value,'utf8'),cipher.final()]);return [iv.toString('base64'),cipher.getAuthTag().toString('base64'),data.toString('base64')].join('.')};
export async function GET(request:NextRequest){
 if(!verifyAdminRequest(request))return NextResponse.json({error:'Unauthorized'},{status:401});
 const {data}=await getSupabaseAdmin().from('app_settings').select('value').eq('key','smtp').maybeSingle();const v=data?.value||{};
 return NextResponse.json({host:v.host||'',port:v.port||587,secure:!!v.secure,user:v.user||'',from_email:v.from_email||'',from_name:v.from_name||'Sakif Istiak',notification_email:v.notification_email||'',configured:!!v.password_enc});
}
export async function PUT(request:NextRequest){
 if(!verifyAdminRequest(request))return NextResponse.json({error:'Unauthorized'},{status:401});
 const b=await request.json();const host=String(b.host||'').trim(),user=String(b.user||'').trim(),password=String(b.password||''),from_email=String(b.from_email||'').trim(),notification_email=String(b.notification_email||'').trim(),port=Number(b.port||587);
 if(!host||!user||!password||!/^\\S+@\\S+\\.\\S+$/.test(from_email)||!/^\\S+@\\S+\\.\\S+$/.test(notification_email)||!Number.isInteger(port)||port<1||port>65535||!process.env.ADMIN_SESSION_SECRET)return NextResponse.json({error:'Enter valid SMTP details.'},{status:400});
 const value={host,port,secure:!!b.secure,user,password_enc:encrypt(password),from_email,from_name:String(b.from_name||'Sakif Istiak'),notification_email};
 const {error}=await getSupabaseAdmin().from('app_settings').upsert({key:'smtp',value});
 if(error)return NextResponse.json({error:'Could not save SMTP settings.'},{status:500});return NextResponse.json({success:true});
}
