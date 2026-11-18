/**
 * Biodonth — Lead Sheet Relay
 * Google Apps Script web app.
 *
 * Deploy as: Execute as Me | Who has access: Anyone
 * Script Properties required:
 *   SECRET          — shared secret, same value as SHEETS_WEBHOOK_SECRET on Vercel
 *   SPREADSHEET_ID  — Google Sheets file ID (the long string in the URL)
 *
 * Column order in tab "Leads":
 *   timestamp | nome | whatsapp | caso | prazo | qualificado | event_id |
 *   utm_source | utm_medium | utm_campaign | utm_content | fbclid | page_url | status
 */

var SHEET_NAME = 'Leads';
var HEADERS = [
  'timestamp', 'nome', 'whatsapp', 'caso', 'prazo', 'qualificado',
  'event_id', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content',
  'fbclid', 'page_url', 'status'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var props = PropertiesService.getScriptProperties();
    var secret = props.getProperty('SECRET');
    var spreadsheetId = props.getProperty('SPREADSHEET_ID');

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return jsonResponse({ ok: false, error: 'invalid json' });
    }

    if (!secret || data.secret !== secret) {
      return jsonResponse({ ok: false, error: 'unauthorized' });
    }

    var ss = SpreadsheetApp.openById(spreadsheetId);
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    }

    var now = Utilities.formatDate(new Date(), 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');
    var utms = data.utms || {};

    sheet.appendRow([
      now,
      data.nome || '',
      data.whatsapp || '',
      data.caso || '',
      data.prazo || '',
      data.qualified ? 'SIM' : 'NÃO',
      data.event_id || '',
      utms.utm_source || '',
      utms.utm_medium || '',
      utms.utm_campaign || '',
      utms.utm_content || '',
      data.fbclid || '',
      data.page_url || '',
      ''  // status — filled by reception: contatado / agendado / lixo
    ]);

    return jsonResponse({ ok: true });

  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
