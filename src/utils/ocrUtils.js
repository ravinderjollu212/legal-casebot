// utils/ocrUtils.js
import Tesseract from 'tesseract.js'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'
import mammoth from 'mammoth'
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

export const ocrPage = async (page) => {
    const viewport = page.getViewport({ scale: 2.0 })
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = viewport.width
    canvas.height = viewport.height
    await page.render({ canvasContext: context, viewport }).promise
    const image = canvas.toDataURL('image/png')
    const { data } = await Tesseract.recognize(image, 'eng')
    return data.text
  }

export const extractTextFromPdf = async (file) => {
    const reader = new FileReader()
    return new Promise(resolve => {
      reader.onload = async () => {
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(reader.result) }).promise
        let text = ''
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          text += content.items?.length
            ? content.items.map(item => item.str).join(' ') + '\n\n'
            : await ocrPage(page) + '\n\n'
        }
        resolve(text)
      }
      reader.readAsArrayBuffer(file)
    })
  }

export const getCombinedFileText = async (files, showMessage) => {
  let combinedText = ''

  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) {
      showMessage('warning', `⚠️ ${file.name} is too large. Skipping.`)
      continue
    }

    try {
      if (file.type === 'application/pdf') {
        combinedText += await extractTextFromPdf(file)
      } else if (file.type === 'text/plain') {
        combinedText += await file.text()
      } else if (file.type.includes('wordprocessingml')) {
        const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
        combinedText += result.value
      } else {
        showMessage('warning', `⚠️ Unsupported file: ${file.name}`)
      }
    } catch (error) {
      showMessage('error', `❌ Failed to process ${file.name}`)
    }

    combinedText += '\n\n'
  }

  return combinedText
}

export const printHtmlDraft = (html, darkMode = false) => {
  const printWindow = window.open('', '_blank', 'width=800,height=600')

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Draft</title>
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
        <style>
          body {
            font-family: 'Segoe UI', sans-serif;
            padding: 20px;
            line-height: 1.6;
            color: ${darkMode ? '#f5f5f5' : '#000'};
            background-color: ${darkMode ? '#1e1e1e' : '#fff'};
          }
          main {
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <main>${html}</main>
        <script>
          window.onload = function () {
            window.print()
          }
        </script>
      </body>
    </html>
  `

  printWindow.document.open()
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
