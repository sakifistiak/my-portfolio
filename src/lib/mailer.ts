import nodemailer from 'nodemailer';
import {createDecipheriv,createHash} from 'node:crypto';
import {getSupabaseAdmin} from '@/lib/supabase';

function decrypt(value:string){
 const [iv,tag,data]=value.split('.');
 const key=createHash('sha256').update(process.env.ADMIN_SESSION_SECRET||'').digest();
 const decipher=createDecipheriv('aes-256-gcm',key,Buffer.from(iv,'base64'));
 decipher.setAuthTag(Buffer.from(tag,'base64'));
 return Buffer.concat([decipher.update(Buffer.from(data,'base64')),decipher.final()]).toString('utf8');
}

type MailSettings = {
 host:string; port:number; secure:boolean; user:string; password:string;
 from_email:string; from_name:string; notification_email:string;
};

async function loadMailSettings():Promise<MailSettings|null>{
 const env=process.env;
 // A complete environment configuration takes precedence over database settings.
 if(env.SMTP_HOST&&env.SMTP_USER&&env.SMTP_PASSWORD&&env.SMTP_FROM_EMAIL&&env.SMTP_NOTIFICATION_EMAIL){
  return {host:env.SMTP_HOST,port:Number(env.SMTP_PORT||587),secure:env.SMTP_SECURE==='true',user:env.SMTP_USER,password:env.SMTP_PASSWORD,from_email:env.SMTP_FROM_EMAIL,from_name:env.SMTP_FROM_NAME||'Sakif Istiak',notification_email:env.SMTP_NOTIFICATION_EMAIL};
 }
 const {data,error}=await getSupabaseAdmin().from('app_settings').select('value').eq('key','smtp').maybeSingle();
 const saved=data?.value;
 if(!error && saved?.password_enc){
  // Allow safe transport-only overrides (e.g. bypass a proxied DNS hostname)
  // while retaining the encrypted SMTP credentials and recipient settings in Supabase.
  return {
   host:env.SMTP_HOST||saved.host,
   port:Number(env.SMTP_PORT||saved.port||587),
   secure:env.SMTP_SECURE===undefined?!!saved.secure:env.SMTP_SECURE==='true',
   user:saved.user,
   password:decrypt(saved.password_enc),
   from_email:saved.from_email,
   from_name:saved.from_name||'Sakif Istiak',
   notification_email:saved.notification_email,
  };
 }
 return null;
}

export async function sendBookingEmail(to:string,subject:string,html:string,replyTo?:string){
 const s=await loadMailSettings();
 if(!s)throw new Error('SMTP is not configured. Open /panel/settings and save your Postfix SMTP details.');
 const transporter=nodemailer.createTransport({host:s.host,port:s.port,secure:s.secure,auth:{user:s.user,pass:s.password},connectionTimeout:12000,greetingTimeout:12000,socketTimeout:20000});
 await transporter.sendMail({from:`"${s.from_name}" <${s.from_email}>`,to,replyTo,subject,html});
}

export async function verifyBookingMailConnection(){
 const s=await loadMailSettings();
 if(!s)throw new Error('SMTP is not configured.');
 const transporter=nodemailer.createTransport({host:s.host,port:s.port,secure:s.secure,auth:{user:s.user,pass:s.password},connectionTimeout:8000,greetingTimeout:8000,socketTimeout:10000});
 await transporter.verify();
 return {host:s.host,port:s.port};
}

export async function getBookingMailSettings(){
 const s=await loadMailSettings();
 if(!s)return null;
 return {host:s.host,port:s.port,secure:s.secure,user:s.user,from_email:s.from_email,from_name:s.from_name,notification_email:s.notification_email,configured:true};
}
