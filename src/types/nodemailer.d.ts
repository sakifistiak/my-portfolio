declare module 'nodemailer' {
  type TransportOptions = {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    connectionTimeout?: number;
    greetingTimeout?: number;
    socketTimeout?: number;
  };

  type MailOptions = {
    from: string;
    to: string;
    replyTo?: string;
    subject: string;
    html: string;
  };

  type SentMessageInfo = {
    messageId?: string;
    accepted?: string[];
    rejected?: string[];
  };

  type Transporter = {
    sendMail(options: MailOptions): Promise<SentMessageInfo>;
  };

  function createTransport(options: TransportOptions): Transporter;

  const nodemailer: {
    createTransport: typeof createTransport;
  };

  export { createTransport };
  export default nodemailer;
}
