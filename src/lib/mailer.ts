import nodemailer from 'nodemailer';
import {createDecipheriv,createHash} from 'node:crypto';
import {getSupabaseAdmin} from '@/lib/supabase';
function decrypt(value:string){const [iv,tag,data]=value.split('.');const key=createHash('sha256').update(process.env.ADMIN_SESSION_SECRET||'').digest();const decipher=createDecipheriv('aes-256-gcm',key,Buffer.from(iv,'base64'));decipher.setAuthTag(Buffer.from(tag,'base64'));return Buffer.concat([decipher.update(Buffer.from(data,'base64')),decipher.final()]).toString('utf8')}
export async function sendBookingEmail(to:string,subject:string,html:string,replyTo?:string){
 const {data,error}=await getSupabaseAdmin().from('app_settings').select('value').eq('key','smtp').maybeSingle();
 if(error||!data?.value?.password_enc)throw new Error('SMTP is not configured. Open /panel/settings and save your Postfix SMTP details.');
 const s=data.value;const transporter=nodemailer.createTransport({host:s.host,port:Number(s.port),secure:!!s.secure,auth:{user:s.user,pass:decrypt(s.password_enc)},connectionTimeout:12000,greetingTimeout:12000,socketTimeout:20000});
 await transporter.sendMail({from:`"${s.from_name||'Sakif Istiak'}" <${s.from_email}>`,to,replyTo,subject,html});
}
export async function getBookingMailSettings(){const {data}=await getSupabaseAdmin().from('app_settings').select('value').eq('key','smtp').maybeSingle();return data?.value||null}
