import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Отправка email-напоминаний о предстоящих событиях
    Args: event с httpMethod, body содержащим recipient_email, event_title, event_date, recipient_name
    Returns: HTTP response с результатом отправки
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    recipient_email: str = body_data.get('recipient_email', '')
    event_title: str = body_data.get('event_title', '')
    event_date: str = body_data.get('event_date', '')
    recipient_name: str = body_data.get('recipient_name', '')
    
    if not recipient_email or not event_title or not event_date:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing required fields: recipient_email, event_title, event_date'}),
            'isBase64Encoded': False
        }
    
    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    
    if not all([smtp_host, smtp_user, smtp_password]):
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'SMTP configuration not set'}),
            'isBase64Encoded': False
        }
    
    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }}
            .container {{ max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); padding: 40px 20px; text-align: center; }}
            .header h1 {{ color: white; margin: 0; font-size: 28px; }}
            .header .icon {{ font-size: 64px; margin-bottom: 10px; }}
            .content {{ padding: 40px 30px; }}
            .event-card {{ background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #667eea; }}
            .event-card h2 {{ margin: 0 0 12px 0; color: #333; font-size: 22px; }}
            .event-card .detail {{ margin: 8px 0; color: #555; font-size: 16px; }}
            .event-card .detail strong {{ color: #333; }}
            .cta-button {{ display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; font-size: 16px; }}
            .footer {{ background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }}
            .footer a {{ color: #667eea; text-decoration: none; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="icon">🎁</div>
                <h1>Напоминание о событии!</h1>
            </div>
            <div class="content">
                <p style="font-size: 18px; color: #333;">Здравствуйте!</p>
                <p style="font-size: 16px; color: #555; line-height: 1.6;">
                    Напоминаем, что через 7 дней наступает важное событие:
                </p>
                <div class="event-card">
                    <h2>📅 {event_title}</h2>
                    <div class="detail"><strong>Дата:</strong> {event_date}</div>
                    {f'<div class="detail"><strong>Получатель:</strong> {recipient_name}</div>' if recipient_name else ''}
                </div>
                <p style="font-size: 16px; color: #555; line-height: 1.6;">
                    Мы уже начали подготовку подарка! Проверьте детали доставки в личном кабинете.
                </p>
                <center>
                    <a href="https://gifts.example.com/dashboard" class="cta-button">
                        Открыть личный кабинет →
                    </a>
                </center>
                <p style="font-size: 14px; color: #777; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    💡 <strong>Совет:</strong> Вы можете изменить адрес доставки или выбрать другой подарок в течение следующих 5 дней.
                </p>
            </div>
            <div class="footer">
                <p>© 2024 Подарочный помощник. Все права защищены.</p>
                <p>
                    <a href="https://gifts.example.com">Главная</a> | 
                    <a href="https://gifts.example.com/faq">FAQ</a> | 
                    <a href="mailto:support@gifts.example.com">Поддержка</a>
                </p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">
                    Если вы получили это письмо по ошибке, просто проигнорируйте его.
                </p>
            </div>
        </div>
    </body>
    </html>
    """
    
    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'🎁 Напоминание: {event_title} через 7 дней!'
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    
    html_part = MIMEText(html_body, 'html', 'utf-8')
    msg.attach(html_part)
    
    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_password)
    server.send_message(msg)
    server.quit()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'message': f'Email sent to {recipient_email}',
            'event': event_title,
            'sent_at': datetime.utcnow().isoformat()
        }),
        'isBase64Encoded': False
    }
