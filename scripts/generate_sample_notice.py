from PIL import Image, ImageDraw, ImageFont
import os

# Create a crisp letter-sized document (800 x 1100 px, 300dpi feel)
width, height = 800, 1100
image = Image.new("RGB", (width, height), color="#fcfcfd")
draw = ImageDraw.Draw(image)

# Border
draw.rectangle([(20, 20), (width - 20, height - 20)], outline="#2d3748", width=2)
draw.rectangle([(24, 24), (width - 24, height - 24)], outline="#cbd5e0", width=1)

# Text setup
try:
    font_title = ImageFont.truetype("arial.ttf", 22)
    font_bold = ImageFont.truetype("arialbd.ttf", 14)
    font_sub = ImageFont.truetype("arial.ttf", 13)
    font_body = ImageFont.truetype("arial.ttf", 12)
    font_small = ImageFont.truetype("arial.ttf", 10)
except Exception:
    font_title = ImageFont.load_default()
    font_bold = font_title
    font_sub = font_title
    font_body = font_title
    font_small = font_title

# Header
y = 45
draw.text((width / 2, y), "NATIONAL INSTITUTE OF TECHNOLOGY, SURATHKAL", fill="#1a202c", font=font_title, anchor="mt")
y += 32
draw.text((width / 2, y), "OFFICE OF THE CONTROLLER OF EXAMINATIONS", fill="#2d3748", font=font_bold, anchor="mt")
y += 24
draw.text((width / 2, y), "P.O. Srinivasnagar, Mangaluru - 575025, Karnataka, India", fill="#4a5568", font=font_small, anchor="mt")
y += 18
draw.line([(50, y), (width - 50, y)], fill="#a0aec0", width=1)
y += 15

# Ref & Date
draw.text((50, y), "Ref. No: NITK/COE/2026/CIR-104", fill="#1a202c", font=font_bold)
draw.text((width - 50, y), "Date: October 01, 2026", fill="#1a202c", font=font_bold, anchor="rt")
y += 35

# Title
draw.text((width / 2, y), "CIRCULAR / NOTIFICATION", fill="#9b2c2c", font=font_bold, anchor="mt")
y += 25
draw.text((50, y), "SUBJECT: End-Semester Examinations Schedule & Mandatory Registration — Fall Term 2026", fill="#1a202c", font=font_bold)
y += 25
draw.line([(50, y), (width - 50, y)], fill="#e2e8f0", width=1)
y += 20

# Body paragraphs
paragraphs = [
    "1. All registered undergraduate (B.Tech) and postgraduate (M.Tech/MCA/MBA/M.Sc) students are hereby informed that the End-Semester Regular Examinations for the Fall Term 2026 are scheduled to commence from November 15, 2026.",
    "2. MANDATORY REGISTRATION & FEE PAYMENT:",
    "   - Examination portal opens: October 10, 2026 at 10:00 AM IST.",
    "   - Normal registration deadline without penalty: October 25, 2026 (Prescribed Fee: Rs. 1,500).",
    "   - Late registration window: October 26 to November 02, 2026 with an additional statutory fine of Rs. 500 (Total Rs. 2,000).",
    "   - Under no circumstances will registrations be entertained subsequent to November 02, 2026.",
    "3. HALL TICKETS / ADMIT CARDS:",
    "   - Eligible candidates can download their hall tickets from the IRIS portal starting November 10, 2026.",
    "   - Candidates must carry a hard copy of the hall ticket along with their physical Institute Identity Card.",
    "4. ATTENDANCE & ELIGIBILITY ORDINANCE:",
    "   - Pursuant to Academic Ordinance 14(B), a minimum aggregate attendance of 75% in each enrolled course is mandatory. Candidates falling short shall be summarily debarred from appearing in the respective examination without remission of fees.",
    "5. PROHIBITED ARTICLES:",
    "   - Possession of mobile phones, smartwatches, digital devices, and programmable calculators inside the examination hall is strictly prohibited and shall be construed as malpractice under Regulation 22.",
    "6. SPECIAL ACCOMMODATIONS:",
    "   - PwD candidates requiring compensatory time or scribe support must submit Form-IV to the COE office latest by October 20, 2026.",
]

for p in paragraphs:
    if "MANDATORY" in p or "HALL TICKETS" in p or "ATTENDANCE" in p or "PROHIBITED" in p or "SPECIAL" in p:
        draw.text((50, y), p, fill="#2b6cb0", font=font_bold)
        y += 22
    elif p.startswith("   -"):
        draw.text((65, y), p, fill="#2d3748", font=font_body)
        y += 20
    else:
        # Wrap long text roughly
        words = p.split(" ")
        line = ""
        for word in words:
            test_line = line + " " + word if line else word
            if len(test_line) > 95:
                draw.text((50, y), line, fill="#2d3748", font=font_body)
                y += 18
                line = word
            else:
                line = test_line
        if line:
            draw.text((50, y), line, fill="#2d3748", font=font_body)
            y += 22

y += 30
# Sign-off
draw.text((width - 60, y), "Sd/-", fill="#1a202c", font=font_bold, anchor="rt")
y += 18
draw.text((width - 60, y), "Dr. K. S. Raman, Ph.D.", fill="#1a202c", font=font_bold, anchor="rt")
y += 18
draw.text((width - 60, y), "Controller of Examinations", fill="#4a5568", font=font_body, anchor="rt")
y += 18
draw.text((width - 60, y), "NITK Surathkal", fill="#4a5568", font=font_body, anchor="rt")

# Footer
draw.line([(50, height - 50), (width - 50, height - 50)], fill="#cbd5e0", width=1)
draw.text((50, height - 40), "Copy to: Director's Office, All Deans, HODs, Notice Boards, and Student Portal", fill="#718096", font=font_small)
draw.text((width - 50, height - 40), "Page 1 of 1", fill="#718096", font=font_small, anchor="rt")

output_path = os.path.join("public", "sample-exam-notice.png")
image.save(output_path, "PNG")
print(f"Generated sample notice image at: {output_path}")
