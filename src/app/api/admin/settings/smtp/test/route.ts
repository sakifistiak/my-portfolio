import {NextRequest,NextResponse} from 'next/server';
import {verifyAdminRequest} from '@/lib/admin-api';
import {sendBookingEmail,getBookingMailSettings,verifyBookingMailConnection} from '@/lib/mailer';
export async function POST(request:NextRequest){
 if(!verifyAdminRequest(request))return NextResponse.json({error:'Unauthorized'},{status:401});
 try{const s=await getBookingMailSettings();if(!s?.notification_email)throw new Error('Save SMTP settings first.');await sendBookingEmail(s.notification_email,'SMTP test — Sakif Portfolio','<p>Your Postfix SMTP connection is working. Booking notifications are ready.</p>');return NextResponse.json({success:true})}
 catch(e){return NextResponse.json({error:e instanceof Error?e.message:'SMTP test failed.'},{status:502})}
}
