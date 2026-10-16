// cat: { name, trait, fur, eye, ear, pattern, patternColor, longHair, eye2? }
// ear: n normal · f fold · c curl · b big · s small ; pattern: none · stripe · point · spot · patch · tux · mask
const groups = {
  thai: { name:"แมวไทยสายฉลาด", short:"แมวไทย", color:"--group-thai",
    desc:"คุณชอบแมวที่ฉลาด รู้ใจ และผูกพันกับคน แมวไทยช่างคุย ติดเจ้าของ และเลี้ยงง่ายในอากาศบ้านเรา",
    cats:[
      { name:"วิเชียรมาศ", trait:"ช่างพูด ติดคน", fur:"#efe3cf", eye:"#3d7fc4", ear:"n", pattern:"point", patternColor:"#4a3426", longHair:0 },
      { name:"โคราช (สีสวาด)", trait:"ขนสีเงิน แมวนำโชค", fur:"#8d96a3", eye:"#7cbf4a", ear:"n", pattern:"none", patternColor:"", longHair:0 },
      { name:"ขาวมณี", trait:"ขาวทั้งตัว ตาสองสี", fur:"#f6f3ee", eye:"#3d7fc4", ear:"n", pattern:"none", patternColor:"", longHair:0, eye2:"#d9a521" },
      { name:"ศุภลักษณ์", trait:"สีทองแดง หายาก", fur:"#7a4a2c", eye:"#d9a521", ear:"n", pattern:"none", patternColor:"", longHair:0 },
      { name:"โกนจา", trait:"ดำสนิท ขี้เล่น", fur:"#26211e", eye:"#e0b33a", ear:"n", pattern:"none", patternColor:"", longHair:0 },
      { name:"แมวส้มไทย", trait:"อ้วนกลม กินเก่ง", fur:"#e58c3a", eye:"#c9a227", ear:"n", pattern:"stripe", patternColor:"#b8601d", longHair:0 },
      { name:"แมวลายสลิด", trait:"แมวบ้านสายถึก", fur:"#9a8670", eye:"#9fb33a", ear:"n", pattern:"stripe", patternColor:"#4e4035", longHair:0 },
      { name:"แมวสามสี", trait:"สวย ฉลาด เอาแต่ใจ", fur:"#f4efe6", eye:"#c9a227", ear:"n", pattern:"patch", patternColor:"#d9822f", longHair:0 },
      { name:"แมวหางสั้นแม่โขง", trait:"หางสั้นงอ ซื่อสัตย์", fur:"#d8c7ae", eye:"#5ea3d6", ear:"n", pattern:"point", patternColor:"#6b5442", longHair:0 },
      { name:"แมววัว (ขาวดำ)", trait:"ร่าเริง ไม่กลัวใคร", fur:"#2a2523", eye:"#d9a521", ear:"n", pattern:"tux", patternColor:"#f4efe6", longHair:0 }
    ]},
  fluffy: { name:"ขนยาวขี้อ้อน", short:"ขนยาว", color:"--group-fluffy",
    desc:"คุณชอบแมวขนฟู นุ่ม ใจเย็น และชอบให้กอด เหมาะกับคนที่อยากได้เพื่อนนั่งเล่นเงียบๆ ที่บ้าน",
    cats:[
      { name:"เปอร์เซีย", trait:"หน้าแบน ใจเย็นสุดๆ", fur:"#f3ece2", eye:"#d98a2b", ear:"s", pattern:"none", patternColor:"", longHair:1 },
      { name:"แร็กดอล", trait:"ตัวอ่อนปวกเปียกเวลาอุ้ม", fur:"#f0e6d6", eye:"#3d7fc4", ear:"n", pattern:"point", patternColor:"#6d5848", longHair:1 },
      { name:"เมนคูน", trait:"ยักษ์ใจดี", fur:"#8a6a4c", eye:"#c9a227", ear:"b", pattern:"stripe", patternColor:"#4d3a2a", longHair:1 },
      { name:"นอร์วีเจียนฟอเรสต์", trait:"ขนหนา ชอบปีนป่าย", fur:"#a39582", eye:"#7cbf4a", ear:"n", pattern:"stripe", patternColor:"#5d5244", longHair:1 },
      { name:"ไซบีเรียน", trait:"ทนหนาว ขี้อ้อน", fur:"#b0a089", eye:"#c9a227", ear:"n", pattern:"stripe", patternColor:"#6a5a48", longHair:1 },
      { name:"เบอร์แมน", trait:"ถุงเท้าขาว อ่อนโยน", fur:"#efe4d0", eye:"#3d7fc4", ear:"n", pattern:"point", patternColor:"#5e4a3a", longHair:1 },
      { name:"หิมาลายัน", trait:"ขนฟู ตาสีฟ้า", fur:"#f2e8da", eye:"#4f9be0", ear:"s", pattern:"point", patternColor:"#7a6050", longHair:1 },
      { name:"เตอร์กิชแองโกร่า", trait:"สง่างาม ตาสองสี", fur:"#faf7f2", eye:"#3d7fc4", ear:"n", pattern:"none", patternColor:"", longHair:1, eye2:"#d9a521" },
      { name:"บริติชลองแฮร์", trait:"นิ่ง สุขุม", fur:"#8e98a6", eye:"#d98a2b", ear:"s", pattern:"none", patternColor:"", longHair:1 },
      { name:"บาลินีส", trait:"ช่างพูด ขนนุ่ม", fur:"#efe2cc", eye:"#3d7fc4", ear:"b", pattern:"point", patternColor:"#4a3426", longHair:1 }
    ]},
  active: { name:"ขนสั้นจอมซน", short:"จอมซน", color:"--group-active",
    desc:"คุณชอบแมวขนสั้นที่ตื่นตัว อยากรู้อยากเห็น และเล่นสนุก เหมาะกับบ้านที่มีเวลาเล่นด้วยทุกวัน",
    cats:[
      { name:"อเมริกันช็อตแฮร์", trait:"เลี้ยงง่าย เป็นมิตร", fur:"#b9b3aa", eye:"#7cbf4a", ear:"n", pattern:"stripe", patternColor:"#3f3a35", longHair:0 },
      { name:"เบงกอล", trait:"ลายเสือดาว ชอบน้ำ", fur:"#d9a35c", eye:"#7cbf4a", ear:"n", pattern:"spot", patternColor:"#4a3220", longHair:0 },
      { name:"อะบิสซิเนียน", trait:"อยากรู้อยากเห็น", fur:"#b8743d", eye:"#c9a227", ear:"b", pattern:"none", patternColor:"", longHair:0 },
      { name:"บริติชช็อตแฮร์", trait:"แก้มป่อง ชิลล์", fur:"#7f8a99", eye:"#d98a2b", ear:"s", pattern:"none", patternColor:"", longHair:0 },
      { name:"รัสเซียนบลู", trait:"ขี้อาย แต่รักเจ้าของ", fur:"#6f7d8c", eye:"#5fb04a", ear:"b", pattern:"none", patternColor:"", longHair:0 },
      { name:"สยาม (Siamese)", trait:"เสียงดัง ขี้อ้อน", fur:"#efe3cf", eye:"#3d7fc4", ear:"b", pattern:"point", patternColor:"#3b2a20", longHair:0 },
      { name:"อียิปเชียนมาว", trait:"วิ่งเร็วที่สุด", fur:"#bfb8ab", eye:"#8fc23f", ear:"n", pattern:"spot", patternColor:"#4a4540", longHair:0 },
      { name:"โอซิแคท", trait:"ลายจุด ขี้เล่นแบบหมา", fur:"#c9a37a", eye:"#c9a227", ear:"n", pattern:"spot", patternColor:"#5a3c24", longHair:0 },
      { name:"เบอร์มีส", trait:"ติดคน ชอบนั่งตัก", fur:"#5a3d2b", eye:"#d9a521", ear:"n", pattern:"none", patternColor:"", longHair:0 },
      { name:"ซาวันนาห์", trait:"ตัวสูง กระโดดเก่ง", fur:"#d6b07a", eye:"#9fb33a", ear:"b", pattern:"spot", patternColor:"#2e2318", longHair:0 }
    ]},
  unique: { name:"หน้าตาไม่ซ้ำใคร", short:"ไม่ซ้ำใคร", color:"--group-unique",
    desc:"คุณชอบแมวที่มีเอกลักษณ์ หูพับ ขาสั้น หรือไม่มีขน เห็นครั้งเดียวก็จำได้ และพร้อมดูแลเป็นพิเศษ",
    cats:[
      { name:"สฟิงซ์", trait:"ไม่มีขน อุ่นเหมือนพีช", fur:"#e7bfa8", eye:"#7cbf4a", ear:"b", pattern:"none", patternColor:"", longHair:0 },
      { name:"สก็อตติชโฟลด์", trait:"หูพับ หน้ากลม", fur:"#a7adb5", eye:"#d98a2b", ear:"f", pattern:"stripe", patternColor:"#6d737b", longHair:0 },
      { name:"มันช์กิ้น", trait:"ขาสั้นน่ารัก", fur:"#d9c3a0", eye:"#c9a227", ear:"n", pattern:"patch", patternColor:"#8a6a4c", longHair:0 },
      { name:"เดวอนเร็กซ์", trait:"หูใหญ่ เหมือนเอเลี่ยน", fur:"#c8b8a6", eye:"#d9a521", ear:"b", pattern:"none", patternColor:"", longHair:0 },
      { name:"คอร์นิชเร็กซ์", trait:"ขนหยิก ตัวเพรียว", fur:"#e6d6c2", eye:"#c9a227", ear:"b", pattern:"patch", patternColor:"#2b2522", longHair:0 },
      { name:"ปีเตอร์บอลด์", trait:"ขนน้อย ขายาว", fur:"#d7b19a", eye:"#5fb04a", ear:"b", pattern:"none", patternColor:"", longHair:0 },
      { name:"อเมริกันเคิร์ล", trait:"หูม้วนไปข้างหลัง", fur:"#c79a62", eye:"#7cbf4a", ear:"c", pattern:"stripe", patternColor:"#7a5530", longHair:0 },
      { name:"เจแปนนีสบ็อบเทล", trait:"หางปอม แมวกวัก", fur:"#f5f1ea", eye:"#d9a521", ear:"n", pattern:"patch", patternColor:"#d9822f", longHair:0 },
      { name:"ลีคอย (แมวหมาป่า)", trait:"หน้ากากดำ ลุคหมาป่า", fur:"#8b8580", eye:"#d9a521", ear:"n", pattern:"mask", patternColor:"#2a2624", longHair:0 },
      { name:"เอ็กซอติกช็อตแฮร์", trait:"หน้าแบน ขนสั้น", fur:"#d9a668", eye:"#d98a2b", ear:"s", pattern:"none", patternColor:"", longHair:0 }
    ]}
};
