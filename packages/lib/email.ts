// packages/lib/email.ts

export function magicLinkHtml(url: string) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="color-scheme" content="dark light">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Mystiquill · Sign-In</title>
</head>

<body style="margin:0;padding:0;background:#0c0b12;color:#eae7f2;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0c0b12;padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0"
          style="background:#12101a;border:1px solid rgba(192,192,192,0.18);border-radius:16px;padding:32px;">
          
          <tr>
            <td align="center" style="padding-bottom:12px;">
              <div style="font-family:'Cormorant Garamond',serif;font-size:28px;letter-spacing:.5px;">
                Mystiquill
              </div>
              <div style="opacity:.75;font-size:12px;margin-top:4px;">
                “I build rituals in pixels and poems in motion.”
              </div>
            </td>
          </tr>

          <tr><td style="height:12px;"></td></tr>

          <tr>
            <td style="font-size:16px;line-height:1.6;">
              <p>Your one-time sign-in link is below. It expires shortly.</p>

              <p style="margin:24px 0;" align="center">
                <a href="${url}"
                  style="display:inline-block;padding:12px 20px;border-radius:999px;
                         text-decoration:none;border:1px solid rgba(212,175,55,.7);
                         color:#eae7f2;">
                  Enter the Sanctum
                </a>
              </p>

              <p>If the button doesn’t work, copy and paste this URL:</p>
              <p style="word-break:break-all;font-size:12px;opacity:.8;">${url}</p>
            </td>
          </tr>

          <tr><td style="height:16px;"></td></tr>

          <tr>
            <td style="font-size:12px;opacity:.7;">
              Sent with gold & silver seals — Mystiquill
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function magicLinkText(url: string) {
  return `Your Mystiquill sign-in link:\n\n${url}\n\nThis link expires shortly.`;
}