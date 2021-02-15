const { Router } = require('express');
const router = Router();

//nodemailer
const nodemailer=require('nodemailer');
smtpTransport=require('nodemailer-smtp-transport')

let transporter= nodemailer.createTransport(smtpTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'saraZapata6789@gmail.com',
        pass: 'mypassword1234'
    }
}))

router.post('/sendMail',(req,res)=>{
    const {correo,subject,contrasena, nombre} = req.body

    const contentHTML = `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    
    <body>
        <div style="max-width:625px;
                margin-top:0;margin-left:auto;margin-bottom:0;margin-right:auto">
            <table border="0" cellpadding="0" cellspacing="0" dir="ltr" id="m_22375324755315983container"
                style="border-collapse:collapse;border-bottom-style:none;border-right-style:none;border-top-style:none;border-left-style:none;color:#666666;font-family:Helvetica,Arial,sans-serif"
                width="100%">
                <tbody>
                    <tr>
                        <td align="left" id="m_22375324755315983preheaderRow"
                            style="line-height:1em;text-align:left;font-size:12px;padding-top:0;padding-right:0;padding-bottom:12px;padding-left:0">
                        </td>
                    </tr>
                    <tr>
                        <td align="left" id="m_22375324755315983logoRow"
                            style="background-color:#f5f5f5;line-height:1em;padding-bottom:18px;padding-left:13px;padding-right:13px;padding-top:24px;text-align:left"
                            valign="middle">
                            <table align="left" cellpadding="0" cellspacing="0" id="m_22375324755315983logo"
                                style="border-collapse:collapse;border-bottom-style:none;border-right-style:none;border-top-style:none;border-left-style:none;color:#666666;font-family:Helvetica,Arial,sans-serif"
                                width="200">
                                <tbody>
                                    <tr>
                                        <td align="left" style="line-height:1em;text-align:left" valign="middle"><img
                                                alt="Logo" border="0"
                                                src="https://sanidad.sepca.es/wp-content/uploads/2017/12/checklist-2024181_640.png"
                                                style="border-top-style:none;border-left-style:none;border-bottom-style:none;border-right-style:none;display:block;outline:none;"
                                                title="Google for Education" width="200" class="CToWUd"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table align="right" cellpadding="0" cellspacing="0" id="m_22375324755315983date"
                                style="border-collapse:collapse;color:#666666;font-family:Helvetica,Arial,sans-serif;font-size:16px;text-align:right!important;border-top-style:none;border-right-style:none;border-bottom-style:none;border-left-style:none"
                                width="289">
                                <tbody>
                                    <tr>
                                        <td align="right" id="m_22375324755315983Edition" height="26"
                                            style="line-height:1em;text-align:right;padding-top:0;padding-right:30px;padding-bottom:0;padding-left:0"
                                            valign="middle"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="left" id="m_22375324755315983contentRow"
                            style="background-color:#f5f5f5;line-height:1em;padding-bottom:13px;padding-left:13px;padding-right:13px;padding-top:0;text-align:left">
                            <table cellpadding="0" cellspacing="0" id="m_22375324755315983moduleContainer"
                                style="border-collapse:collapse;border-bottom-style:none;border-right-style:none;border-top-style:none;border-left-style:none;color:#666666;font-family:Helvetica,Arial,sans-serif"
                                width="100%">
                                <tbody>
                                    <tr>
                                        <td align="left" style="line-height:1em;text-align:left;padding-bottom:20px">
                                            <table cellpadding="0" cellspacing="0"
                                                style="border-collapse:collapse;color:#666666;font-family:Helvetica,Arial,sans-serif;border-top-color:#e9e9e9;border-right-color:#e9e9e9;border-bottom-color:#e9e9e9;border-left-color:#e9e9e9;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;border-top-width:1px;border-right-width:1px;border-bottom-width:1px;border-left-width:1px"
                                                width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td align="left"
                                                            style="background-color:#ffffff;line-height:1em;padding-bottom:30px;padding-left:31px;padding-right:31px;padding-top:30px;text-align:left">
                                                            <table cellpadding="0" cellspacing="0"
                                                                style="border-collapse:collapse;border-bottom-style:none;border-right-style:none;border-top-style:none;border-left-style:none;color:#666666;font-family:Helvetica,Arial,sans-serif"
                                                                width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left"
                                                                            id="m_22375324755315983IntroHeadline"
                                                                            style="line-height:26px;text-align:left;font-size:14px;font-weight:normal;padding-bottom:10px">
                                                                            <span
                                                                                style="font-family:helvetica,arial,sans-serif;font-size:14px">
                                                                                Hola <b>${nombre}</b>!!! <br><br>
                                                                                <b>Nos alegra mucho que seas parte de nuestra plataforma</b>  <br>
                                
                                                                            </span><br
                                                                                style="color:#666666;font-family:Verdana,Arial,Helvetica,sans-serif;font-size:14px;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:normal;letter-spacing:normal;text-align:left;text-indent:0px;text-transform:none;white-space:normal;word-spacing:0px;background-color:#ffffff">
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="align-content: center; align-items: center;">
                                                                            <span>estas son tus credenciales de acceso a la paltaforma:</span><br/>
                                                                            <span>usuario: ${correo}</span><br/>
                                                                            <span>contraseña: ${contrasena}</span><br/>

                                                                            
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left" id="m_22375324755315983emailCopyright"
                                            style="line-height:16px;text-align:left;padding-top:0;padding-right:30px;padding-bottom:21px;padding-left:30px">
                                            <a style="color:#666666!important;text-decoration:none"
                                                href="#m_22375324755315983_">© 2019 Dirección..., CA 94043</a></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </body>
    
    </html>
    `

    
    const mailOptions ={
        from: 'Gestiona tus tareas',
        to: correo,
        subject: subject,
        html: contentHTML
    }

    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error);
        }else{
            console.log(`sent: ${info.response}`)
            res.json({message:'correo enviado'})
        }
    })
})



module.exports = router;