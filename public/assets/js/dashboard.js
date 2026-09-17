document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded');
    
    // --- تنظیمات اولیه ---
    const API_URL = 'api/tournaments.php';
    const AUTH_URL = 'api/auth.php';
    
    // --- داده کامل کشورهای جهان با پرچم‌های واقعی ---
    const ALL_COUNTRIES = [
        // آسیا
        { name: 'ایران', continent: 'آسیا', rating: 78, flag: 'https://flagcdn.com/w320/ir.png' },
        { name: 'ژاپن', continent: 'آسیا', rating: 83, flag: 'https://flagcdn.com/w320/jp.png' },
        { name: 'کره جنوبی', continent: 'آسیا', rating: 78, flag: 'https://flagcdn.com/w320/kr.png' },
        { name: 'عربستان سعودی', continent: 'آسیا', rating: 70, flag: 'https://flagcdn.com/w320/sa.png' },
        { name: 'استرالیا', continent: 'اقیانوسیه', rating: 77, flag: 'https://flagcdn.com/w320/au.png' },
        { name: 'قطر', continent: 'آسیا', rating: 71, flag: 'https://flagcdn.com/w320/qa.png' },
        { name: 'چین', continent: 'آسیا', rating: 62, flag: 'https://flagcdn.com/w320/cn.png' },
        { name: 'هند', continent: 'آسیا', rating: 60, flag: 'https://flagcdn.com/w320/in.png' },
        { name: 'عراق', continent: 'آسیا', rating: 63, flag: 'https://flagcdn.com/w320/iq.png' },
        { name: 'امارات متحده عربی', continent: 'آسیا', rating: 63, flag: 'https://flagcdn.com/w320/ae.png' },
        { name: 'عمان', continent: 'آسیا', rating: 65, flag: 'https://flagcdn.com/w320/om.png' },
        { name: 'اردن', continent: 'آسیا', rating: 64, flag: 'https://flagcdn.com/w320/jo.png' },
        { name: 'سوریه', continent: 'آسیا', rating: 62, flag: 'https://flagcdn.com/w320/sy.png' },
        { name: 'لبنان', continent: 'آسیا', rating: 61, flag: 'https://flagcdn.com/w320/lb.png' },
        { name: 'ویتنام', continent: 'آسیا', rating: 60, flag: 'https://flagcdn.com/w320/vn.png' },
        { name: 'تایلند', continent: 'آسیا', rating: 59, flag: 'https://flagcdn.com/w320/th.png' },
        { name: 'فیلیپین', continent: 'آسیا', rating: 58, flag: 'https://flagcdn.com/w320/ph.png' },
        { name: 'مالزی', continent: 'آسیا', rating: 57, flag: 'https://flagcdn.com/w320/my.png' },
        { name: 'اندونزی', continent: 'آسیا', rating: 56, flag: 'https://flagcdn.com/w320/id.png' },
        { name: 'افغانستان', continent: 'آسیا', rating: 60, flag: 'https://flagcdn.com/w320/af.png' },
        { name: 'پاکستان', continent: 'آسیا', rating: 55, flag: 'https://flagcdn.com/w320/pk.png' },
        { name: 'بنگلادش', continent: 'آسیا', rating: 54, flag: 'https://flagcdn.com/w320/bd.png' },
        { name: 'قزاقستان', continent: 'آسیا', rating: 63, flag: 'https://flagcdn.com/w320/kz.png' },
        { name: 'ازبکستان', continent: 'آسیا', rating: 65, flag: 'https://flagcdn.com/w320/uz.png' },
        { name: 'ترکمنستان', continent: 'آسیا', rating: 58, flag: 'https://flagcdn.com/w320/tm.png' },
        { name: 'قرقیزستان', continent: 'آسیا', rating: 57, flag: 'https://flagcdn.com/w320/kg.png' },
        { name: 'تاجیکستان', continent: 'آسیا', rating: 56, flag: 'https://flagcdn.com/w320/tj.png' },
        
        // اروپا
        { name: 'فرانسه', continent: 'اروپا', rating: 93, flag: 'https://flagcdn.com/w320/fr.png' },
        { name: 'انگلیس', continent: 'اروپا', rating: 92, flag: 'https://flagcdn.com/w320/gb-eng.png' },
        { name: 'اسپانیا', continent: 'اروپا', rating: 93, flag: 'https://flagcdn.com/w320/es.png' },
        { name: 'آلمان', continent: 'اروپا', rating: 90, flag: 'https://flagcdn.com/w320/de.png' },
        { name: 'پرتغال', continent: 'اروپا', rating: 93, flag: 'https://flagcdn.com/w320/pt.png' },
        { name: 'هلند', continent: 'اروپا', rating: 88, flag: 'https://flagcdn.com/w320/nl.png' },
        { name: 'ایتالیا', continent: 'اروپا', rating: 87, flag: 'https://flagcdn.com/w320/it.png' },
        { name: 'بلژیک', continent: 'اروپا', rating: 88, flag: 'https://flagcdn.com/w320/be.png' },
        { name: 'کرواسی', continent: 'اروپا', rating: 85, flag: 'https://flagcdn.com/w320/hr.png' },
        { name: 'دانمارک', continent: 'اروپا', rating: 82, flag: 'https://flagcdn.com/w320/dk.png' },
        { name: 'سوئیس', continent: 'اروپا', rating: 82, flag: 'https://flagcdn.com/w320/ch.png' },
        { name: 'سوئد', continent: 'اروپا', rating: 75, flag: 'https://flagcdn.com/w320/se.png' },
        { name: 'لهستان', continent: 'اروپا', rating: 75, flag: 'https://flagcdn.com/w320/pl.png' },
        { name: 'اتریش', continent: 'اروپا', rating: 76, flag: 'https://flagcdn.com/w320/at.png' },
        { name: 'اوکراین', continent: 'اروپا', rating: 76, flag: 'https://flagcdn.com/w320/ua.png' },
        { name: 'جمهوری چک', continent: 'اروپا', rating: 74, flag: 'https://flagcdn.com/w320/cz.png' },
        { name: 'مجارستان', continent: 'اروپا', rating: 73, flag: 'https://flagcdn.com/w320/hu.png' },
        { name: 'نروژ', continent: 'اروپا', rating: 74, flag: 'https://flagcdn.com/w320/no.png' },
        { name: 'یونان', continent: 'اروپا', rating: 73, flag: 'https://flagcdn.com/w320/gr.png' },
        { name: 'ترکیه', continent: 'آسیا', rating: 74, flag: 'https://flagcdn.com/w320/tr.png' },
        { name: 'رومانی', continent: 'اروپا', rating: 68, flag: 'https://flagcdn.com/w320/ro.png' },
        { name: 'صربستان', continent: 'اروپا', rating: 79, flag: 'https://flagcdn.com/w320/rs.png' },
        { name: 'اسکاتلند', continent: 'اروپا', rating: 72, flag: 'https://flagcdn.com/w320/gb-sct.png' },
        { name: 'ایرلند', continent: 'اروپا', rating: 66, flag: 'https://flagcdn.com/w320/ie.png' },
        { name: 'فنلاند', continent: 'اروپا', rating: 66, flag: 'https://flagcdn.com/w320/fi.png' },
        { name: 'اسلواکی', continent: 'اروپا', rating: 70, flag: 'https://flagcdn.com/w320/sk.png' },
        { name: 'اسلونی', continent: 'اروپا', rating: 68, flag: 'https://flagcdn.com/w320/si.png' },
        { name: 'بلغارستان', continent: 'اروپا', rating: 65, flag: 'https://flagcdn.com/w320/bg.png' },
        { name: 'بوسنی و هرزگوین', continent: 'اروپا', rating: 65, flag: 'https://flagcdn.com/w320/ba.png' },
        { name: 'مونته‌نگرو', continent: 'اروپا', rating: 64, flag: 'https://flagcdn.com/w320/me.png' },
        { name: 'آلبانی', continent: 'اروپا', rating: 64, flag: 'https://flagcdn.com/w320/al.png' },
        { name: 'مقدونیه شمالی', continent: 'اروپا', rating: 63, flag: 'https://flagcdn.com/w320/mk.png' },
        { name: 'لتونی', continent: 'اروپا', rating: 62, flag: 'https://flagcdn.com/w320/lv.png' },
        { name: 'لیتوانی', continent: 'اروپا', rating: 61, flag: 'https://flagcdn.com/w320/lt.png' },
        { name: 'استونی', continent: 'اروپا', rating: 60, flag: 'https://flagcdn.com/w320/ee.png' },
        { name: 'ایسلند', continent: 'اروپا', rating: 64, flag: 'https://flagcdn.com/w320/is.png' },
        { name: 'قبرس', continent: 'اروپا', rating: 59, flag: 'https://flagcdn.com/w320/cy.png' },
        { name: 'لوکزامبورگ', continent: 'اروپا', rating: 58, flag: 'https://flagcdn.com/w320/lu.png' },
        { name: 'مالت', continent: 'اروپا', rating: 57, flag: 'https://flagcdn.com/w320/mt.png' },
        { name: 'آندورا', continent: 'اروپا', rating: 55, flag: 'https://flagcdn.com/w320/ad.png' },
        { name: 'سان مارینو', continent: 'اروپا', rating: 50, flag: 'https://flagcdn.com/w320/sm.png' },
        { name: 'لیختن‌اشتاین', continent: 'اروپا', rating: 51, flag: 'https://flagcdn.com/w320/li.png' },
        { name: 'مولداوی', continent: 'اروپا', rating: 63, flag: 'https://flagcdn.com/w320/md.png' },
        { name: 'بلاروس', continent: 'اروپا', rating: 62, flag: 'https://flagcdn.com/w320/by.png' },
        { name: 'ارمنستان', continent: 'آسیا', rating: 61, flag: 'https://flagcdn.com/w320/am.png' },
        { name: 'گرجستان', continent: 'آسیا', rating: 62, flag: 'https://flagcdn.com/w320/ge.png' },
        { name: 'آذربایجان', continent: 'آسیا', rating: 60, flag: 'https://flagcdn.com/w320/az.png' },
        { name: 'کوزوو', continent: 'اروپا', rating: 64, flag: 'https://flagcdn.com/w320/xk.png' },
        
        // آمریکای جنوبی
        { name: 'آرژانتین', continent: 'آمریکای جنوبی', rating: 94, flag: 'https://flagcdn.com/w320/ar.png' },
        { name: 'برزیل', continent: 'آمریکای جنوبی', rating: 91, flag: 'https://flagcdn.com/w320/br.png' },
        { name: 'اروگوئه', continent: 'آمریکای جنوبی', rating: 85, flag: 'https://flagcdn.com/w320/uy.png' },
        { name: 'کلمبیا', continent: 'آمریکای جنوبی', rating: 84, flag: 'https://flagcdn.com/w320/co.png' },
        { name: 'شیلی', continent: 'آمریکای جنوبی', rating: 73, flag: 'https://flagcdn.com/w320/cl.png' },
        { name: 'پرو', continent: 'آمریکای جنوبی', rating: 68, flag: 'https://flagcdn.com/w320/pe.png' },
        { name: 'اکوادور', continent: 'آمریکای جنوبی', rating: 72, flag: 'https://flagcdn.com/w320/ec.png' },
        { name: 'ونزوئلا', continent: 'آمریکای جنوبی', rating: 65, flag: 'https://flagcdn.com/w320/ve.png' },
        { name: 'بولیوی', continent: 'آمریکای جنوبی', rating: 61, flag: 'https://flagcdn.com/w320/bo.png' },
        { name: 'پاراگوئه', continent: 'آمریکای جنوبی', rating: 67, flag: 'https://flagcdn.com/w320/py.png' },
        { name: 'گویان', continent: 'آمریکای جنوبی', rating: 55, flag: 'https://flagcdn.com/w320/gy.png' },
        { name: 'سورینام', continent: 'آمریکای جنوبی', rating: 54, flag: 'https://flagcdn.com/w320/sr.png' },
        
        // آمریکای شمالی و مرکزی
        { name: 'آمریکا', continent: 'آمریکای شمالی', rating: 80, flag: 'https://flagcdn.com/w320/us.png' },
        { name: 'مکزیک', continent: 'آمریکای شمالی', rating: 79, flag: 'https://flagcdn.com/w320/mx.png' },
        { name: 'کانادا', continent: 'آمریکای شمالی', rating: 69, flag: 'https://flagcdn.com/w320/ca.png' },
        { name: 'کاستاریکا', continent: 'آمریکای شمالی', rating: 67, flag: 'https://flagcdn.com/w320/cr.png' },
        { name: 'پاناما', continent: 'آمریکای شمالی', rating: 66, flag: 'https://flagcdn.com/w320/pa.png' },
        { name: 'جامائیکا', continent: 'آمریکای شمالی', rating: 65, flag: 'https://flagcdn.com/w320/jm.png' },
        { name: 'هندوراس', continent: 'آمریکای شمالی', rating: 64, flag: 'https://flagcdn.com/w320/hn.png' },
        { name: 'السالوادور', continent: 'آمریکای شمالی', rating: 63, flag: 'https://flagcdn.com/w320/sv.png' },
        { name: 'گواتمالا', continent: 'آمریکای شمالی', rating: 62, flag: 'https://flagcdn.com/w320/gt.png' },
        { name: 'نیکاراگوئه', continent: 'آمریکای شمالی', rating: 61, flag: 'https://flagcdn.com/w320/ni.png' },
        { name: 'هائیتی', continent: 'آمریکای شمالی', rating: 60, flag: 'https://flagcdn.com/w320/ht.png' },
        { name: 'جمهوری دومینیکن', continent: 'آمریکای شمالی', rating: 59, flag: 'https://flagcdn.com/w320/do.png' },
        { name: 'ترینیداد و توباگو', continent: 'آمریکای شمالی', rating: 58, flag: 'https://flagcdn.com/w320/tt.png' },
        { name: 'باهاما', continent: 'آمریکای شمالی', rating: 57, flag: 'https://flagcdn.com/w320/bs.png' },
        { name: 'باربادوس', continent: 'آمریکای شمالی', rating: 56, flag: 'https://flagcdn.com/w320/bb.png' },
        { name: 'کوبا', continent: 'آمریکای شمالی', rating: 55, flag: 'https://flagcdn.com/w320/cu.png' },
        { name: 'بلیز', continent: 'آمریکای شمالی', rating: 54, flag: 'https://flagcdn.com/w320/bz.png' },
        { name: 'آنتیگوا و باربودا', continent: 'آمریکای شمالی', rating: 53, flag: 'https://flagcdn.com/w320/ag.png' },
        { name: 'سنت کیتس و نویس', continent: 'آمریکای شمالی', rating: 52, flag: 'https://flagcdn.com/w320/kn.png' },
        { name: 'سنت لوسیا', continent: 'آمریکای شمالی', rating: 51, flag: 'https://flagcdn.com/w320/lc.png' },
        { name: 'سنت وینسنت و گرنادین‌ها', continent: 'آمریکای شمالی', rating: 50, flag: 'https://flagcdn.com/w320/vc.png' },
        { name: 'گرنادا', continent: 'آمریکای شمالی', rating: 49, flag: 'https://flagcdn.com/w320/gd.png' },
        { name: 'دومینیکا', continent: 'آمریکای شمالی', rating: 48, flag: 'https://flagcdn.com/w320/dm.png' },
        
        // آفریقا
        { name: 'مراکش', continent: 'آفریقا', rating: 83, flag: 'https://flagcdn.com/w320/ma.png' },
        { name: 'سنگال', continent: 'آفریقا', rating: 81, flag: 'https://flagcdn.com/w320/sn.png' },
        { name: 'نیجریه', continent: 'آفریقا', rating: 78, flag: 'https://flagcdn.com/w320/ng.png' },
        { name: 'مصر', continent: 'آفریقا', rating: 77, flag: 'https://flagcdn.com/w320/eg.png' },
        { name: 'ساحل عاج', continent: 'آفریقا', rating: 72, flag: 'https://flagcdn.com/w320/ci.png' },
        { name: 'غنا', continent: 'آفریقا', rating: 67, flag: 'https://flagcdn.com/w320/gh.png' },
        { name: 'آفریقای جنوبی', continent: 'آفریقا', rating: 66, flag: 'https://flagcdn.com/w320/za.png' },
        { name: 'تونس', continent: 'آفریقا', rating: 69, flag: 'https://flagcdn.com/w320/tn.png' },
        { name: 'الجزایر', continent: 'آفریقا', rating: 71, flag: 'https://flagcdn.com/w320/dz.png' },
        { name: 'کامرون', continent: 'آفریقا', rating: 68, flag: 'https://flagcdn.com/w320/cm.png' },
        { name: 'مالی', continent: 'آفریقا', rating: 70, flag: 'https://flagcdn.com/w320/ml.png' },
        { name: 'بورکینافاسو', continent: 'آفریقا', rating: 65, flag: 'https://flagcdn.com/w320/bf.png' },
        { name: 'جمهوری دموکراتیک کنگو', continent: 'آفریقا', rating: 64, flag: 'https://flagcdn.com/w320/cd.png' },
        { name: 'کنیا', continent: 'آفریقا', rating: 63, flag: 'https://flagcdn.com/w320/ke.png' },
        { name: 'اوگاندا', continent: 'آفریقا', rating: 62, flag: 'https://flagcdn.com/w320/ug.png' },
        { name: 'تانزانیا', continent: 'آفریقا', rating: 61, flag: 'https://flagcdn.com/w320/tz.png' },
        { name: 'زامبیا', continent: 'آفریقا', rating: 60, flag: 'https://flagcdn.com/w320/zm.png' },
        { name: 'زیمبابوه', continent: 'آفریقا', rating: 59, flag: 'https://flagcdn.com/w320/zw.png' },
        { name: 'آنگولا', continent: 'آفریقا', rating: 58, flag: 'https://flagcdn.com/w320/ao.png' },
        { name: 'موزامبیک', continent: 'آفریقا', rating: 57, flag: 'https://flagcdn.com/w320/mz.png' },
        { name: 'اتیوپی', continent: 'آفریقا', rating: 56, flag: 'https://flagcdn.com/w320/et.png' },
        { name: 'سودان', continent: 'آفریقا', rating: 55, flag: 'https://flagcdn.com/w320/sd.png' },
        { name: 'لیبی', continent: 'آفریقا', rating: 54, flag: 'https://flagcdn.com/w320/ly.png' },
        { name: 'سومالی', continent: 'آفریقا', rating: 53, flag: 'https://flagcdn.com/w320/so.png' },
        { name: 'اریتره', continent: 'آفریقا', rating: 52, flag: 'https://flagcdn.com/w320/er.png' },
        { name: 'جیبوتی', continent: 'آفریقا', rating: 51, flag: 'https://flagcdn.com/w320/dj.png' },
        { name: 'سیشل', continent: 'آفریقا', rating: 50, flag: 'https://flagcdn.com/w320/sc.png' },
        { name: 'موریس', continent: 'آفریقا', rating: 49, flag: 'https://flagcdn.com/w320/mu.png' },
        { name: 'کومور', continent: 'آفریقا', rating: 48, flag: 'https://flagcdn.com/w320/km.png' },
        { name: 'ماداگاسکار', continent: 'آفریقا', rating: 47, flag: 'https://flagcdn.com/w320/mg.png' },
        { name: 'رواندا', continent: 'آفریقا', rating: 66, flag: 'https://flagcdn.com/w320/rw.png' },
        { name: 'بوروندی', continent: 'آفریقا', rating: 65, flag: 'https://flagcdn.com/w320/bi.png' },
        { name: 'سیرالئون', continent: 'آفریقا', rating: 64, flag: 'https://flagcdn.com/w320/sl.png' },
        { name: 'لیبریا', continent: 'آفریقا', rating: 63, flag: 'https://flagcdn.com/w320/lr.png' },
        { name: 'گینه', continent: 'آفریقا', rating: 62, flag: 'https://flagcdn.com/w320/gn.png' },
        { name: 'گینه بیسائو', continent: 'آفریقا', rating: 61, flag: 'https://flagcdn.com/w320/gw.png' },
        { name: 'گینه استوایی', continent: 'آفریقا', rating: 60, flag: 'https://flagcdn.com/w320/gq.png' },
        { name: 'گابن', continent: 'آفریقا', rating: 59, flag: 'https://flagcdn.com/w320/ga.png' },
        { name: 'جمهوری کنگو', continent: 'آفریقا', rating: 58, flag: 'https://flagcdn.com/w320/cg.png' },
        { name: 'جمهوری آفریقای مرکزی', continent: 'آفریقا', rating: 57, flag: 'https://flagcdn.com/w320/cf.png' },
        { name: 'چاد', continent: 'آفریقا', rating: 56, flag: 'https://flagcdn.com/w320/td.png' },
        { name: 'نیجر', continent: 'آفریقا', rating: 55, flag: 'https://flagcdn.com/w320/ne.png' },
        { name: 'بنین', continent: 'آفریقا', rating: 64, flag: 'https://flagcdn.com/w320/bj.png' },
        { name: 'توگو', continent: 'آفریقا', rating: 63, flag: 'https://flagcdn.com/w320/tg.png' },
        { name: 'سائوتومه و پرنسیپ', continent: 'آفریقا', rating: 62, flag: 'https://flagcdn.com/w320/st.png' },
        { name: 'کیپ ورد', continent: 'آفریقا', rating: 65, flag: 'https://flagcdn.com/w320/cv.png' },
        { name: 'گامبیا', continent: 'آفریقا', rating: 64, flag: 'https://flagcdn.com/w320/gm.png' },
        { name: 'موریتانی', continent: 'آفریقا', rating: 63, flag: 'https://flagcdn.com/w320/mr.png' },
        { name: 'مالاوی', continent: 'آفریقا', rating: 62, flag: 'https://flagcdn.com/w320/mw.png' },
        { name: 'لسوتو', continent: 'آفریقا', rating: 61, flag: 'https://flagcdn.com/w320/ls.png' },
        { name: 'اسواتینی', continent: 'آفریقا', rating: 60, flag: 'https://flagcdn.com/w320/sz.png' },
        { name: 'بوتسوانا', continent: 'آفریقا', rating: 59, flag: 'https://flagcdn.com/w320/bw.png' },
        { name: 'نامیبیا', continent: 'آفریقا', rating: 58, flag: 'https://flagcdn.com/w320/na.png' },
        
        // اقیانوسیه
        { name: 'نیوزیلند', continent: 'اقیانوسیه', rating: 76, flag: 'https://flagcdn.com/w320/nz.png' },
        { name: 'فیجی', continent: 'اقیانوسیه', rating: 59, flag: 'https://flagcdn.com/w320/fj.png' },
        { name: 'پاپوآ گینه نو', continent: 'اقیانوسیه', rating: 58, flag: 'https://flagcdn.com/w320/pg.png' },
        { name: 'ساموآ', continent: 'اقیانوسیه', rating: 57, flag: 'https://flagcdn.com/w320/ws.png' },
        { name: 'تونگا', continent: 'اقیانوسیه', rating: 56, flag: 'https://flagcdn.com/w320/to.png' },
        { name: 'جزایر سلیمان', continent: 'اقیانوسیه', rating: 55, flag: 'https://flagcdn.com/w320/sb.png' },
        { name: 'وانواتو', continent: 'اقیانوسیه', rating: 54, flag: 'https://flagcdn.com/w320/vu.png' },
        { name: 'کیریباتی', continent: 'اقیانوسیه', rating: 53, flag: 'https://flagcdn.com/w320/ki.png' },
        { name: 'ایالات فدرال میکرونزی', continent: 'اقیانوسیه', rating: 52, flag: 'https://flagcdn.com/w320/fm.png' },
        { name: 'پالائو', continent: 'اقیانوسیه', rating: 51, flag: 'https://flagcdn.com/w320/pw.png' },
        { name: 'جزایر مارشال', continent: 'اقیانوسیه', rating: 50, flag: 'https://flagcdn.com/w320/mh.png' },
        { name: 'نائورو', continent: 'اقیانوسیه', rating: 49, flag: 'https://flagcdn.com/w320/nr.png' },
        { name: 'تووالو', continent: 'اقیانوسیه', rating: 48, flag: 'https://flagcdn.com/w320/tv.png' },
        { name: 'جزایر کوک', continent: 'اقیانوسیه', rating: 47, flag: 'https://flagcdn.com/w320/ck.png' },
        { name: 'نیوئه', continent: 'اقیانوسیه', rating: 46, flag: 'https://flagcdn.com/w320/nu.png' }
    ];
    
    // --- متغیرهای اصلی ---
    let availableCountries = [...ALL_COUNTRIES];
    let selectedTeams = [];
    let tournamentGroups = null;
    let groupStageMatches = [];
    let knockoutStageMatches = [];
    let currentTournamentId = null;
    let teamStats = {};
    let currentChampion = null;
    
    // --- عناصر HTML ---
    const elements = {
        // بخش انتخاب تیم
        searchInput: document.getElementById('search-input'),
        continentFilter: document.getElementById('continent-filter'),
        availableListEl: document.getElementById('available-teams-list'),
        selectedListEl: document.getElementById('selected-teams-list'),
        selectedTitleEl: document.getElementById('selected-teams-title'),
        availableCountEl: document.getElementById('available-count'),
        selectedCountEl: document.getElementById('selected-count'),
        selectionProgressEl: document.getElementById('selection-progress'),
        
        // دکمه‌های اصلی
        randomSelectButton: document.getElementById('random-select-button'),
        groupingButton: document.getElementById('grouping-button'),
        startSimulationButton: document.getElementById('start-simulation-button'),
        backToSelectionButton: document.getElementById('back-to-selection'),
        
        // بخش تاریخچه
        historySelector: document.getElementById('history-selector'),
        loadHistoryButton: document.getElementById('load-history-button'),
        newTournamentButton: document.getElementById('new-tournament-button'),
        deleteHistoryButton: document.getElementById('delete-history-button'),
        historyInfo: document.getElementById('history-info'),
        
        // بخش نتایج
        resultsSection: document.getElementById('results-section'),
        groupTablesContainer: document.getElementById('group-tables-container'),
        knockoutStageSection: document.getElementById('knockout-stage-section'),
        bracketContainer: document.getElementById('bracket-container'),
        
        // مودال
        matchesModal: document.getElementById('matches-modal'),
        closeModalBtn: document.getElementById('close-modal'),
        modalTeamFlag: document.getElementById('modal-team-flag'),
        modalTeamName: document.getElementById('modal-team-name'),
        matchesList: document.getElementById('matches-list'),
        
        // تم
        themeToggleBtn: document.getElementById('theme-toggle'),
        body: document.body
    };
    
    // --- تابع‌های کمکی ---
    function showNotification(message, type = 'info') {
        // حذف نوتیفیکیشن‌های قبلی
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                              type === 'error' ? 'times-circle' : 
                              type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // نمایش با انیمیشن
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // حذف خودکار بعد از 4 ثانیه
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
        
        return notification;
    }
    
    // --- تابع‌های مدیریت تیم‌ها ---
    function renderAvailableTeams() {
        elements.availableListEl.innerHTML = '';
        
        const searchValue = elements.searchInput.value.toLowerCase();
        const continentValue = elements.continentFilter.value;
        
        const filtered = availableCountries.filter(country => {
            const matchesSearch = country.name.toLowerCase().includes(searchValue);
            const matchesContinent = continentValue === 'all' || country.continent === continentValue;
            return matchesSearch && matchesContinent;
        });
        
        // Update count
        elements.availableCountEl.textContent = filtered.length;
        
        if (filtered.length === 0) {
            elements.availableListEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h4>هیچ تیمی مطابق جستجو یافت نشد</h4>
                    <p>سعی کنید عبارت جستجوی خود را تغییر دهید یا فیلتر قاره را عوض کنید</p>
                </div>
            `;
            return;
        }
        
        filtered.forEach(country => {
            const teamItem = document.createElement('div');
            teamItem.className = 'team-item';
            teamItem.innerHTML = `
                <div class="team-name">
                    <img src="${country.flag}" alt="${country.name}" class="team-flag" loading="lazy">
                    <span>${country.name}</span>
                </div>
                <div class="team-info">
                    <span class="continent-badge">${country.continent}</span>
                    <!-- ریتینگ حذف شده -->
                </div>
            `;
            
            teamItem.addEventListener('click', () => selectTeam(country));
            elements.availableListEl.appendChild(teamItem);
        });
    }
    
    function renderSelectedTeams() {
        elements.selectedListEl.innerHTML = '';
        
        // Update counts
        elements.selectedCountEl.textContent = `${selectedTeams.length}/16`;
        const progressPercent = Math.round((selectedTeams.length / 16) * 100);
        elements.selectionProgressEl.textContent = `${progressPercent}% تکمیل`;
        
        if (selectedTeams.length === 0) {
            elements.selectedListEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-users-slash"></i>
                    </div>
                    <h4>هنوز تیمی انتخاب نشده است</h4>
                    <p>روی تیم‌ها در لیست سمت چپ کلیک کنید یا از دکمه انتخاب تصادفی استفاده نمایید</p>
                </div>
            `;
        } else {
            selectedTeams.forEach(country => {
                const teamItem = document.createElement('div');
                teamItem.className = 'team-item';
                teamItem.innerHTML = `
                    <div class="team-name">
                        <img src="${country.flag}" alt="${country.name}" class="team-flag" loading="lazy">
                        <span>${country.name}</span>
                    </div>
                    <div class="team-info">
                        <span class="continent-badge">${country.continent}</span>
                        <i class="fas fa-times remove-icon"></i>
                    </div>
                `;
                
                const removeIcon = teamItem.querySelector('.remove-icon');
                removeIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    removeTeam(country);
                });
                
                elements.selectedListEl.appendChild(teamItem);
            });
        }
        
        elements.groupingButton.disabled = selectedTeams.length !== 16;
    }
    
    function selectTeam(country) {
        if (selectedTeams.length >= 16) {
            showNotification('حداکثر ۱۶ تیم می‌توانید انتخاب کنید!', 'warning');
            return;
        }
        
        if (selectedTeams.some(t => t.name === country.name)) {
            showNotification('این تیم قبلاً انتخاب شده است!', 'warning');
            return;
        }
        
        selectedTeams.push(country);
        availableCountries = availableCountries.filter(c => c.name !== country.name);
        updateUI();
        
        if (selectedTeams.length === 16) {
            showNotification('۱۶ تیم با موفقیت انتخاب شدند! حالا می‌توانید گروه‌بندی را انجام دهید.', 'success');
        }
    }
    
    function removeTeam(country) {
        selectedTeams = selectedTeams.filter(c => c.name !== country.name);
        availableCountries.push(country);
        // مرتب‌سازی کشورها بر اساس نام
        availableCountries.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
        updateUI();
        showNotification(`تیم ${country.name} حذف شد`, 'info');
    }
    
    function selectRandomTeams() {
        if (availableCountries.length < 16) {
            showNotification('تعداد تیم‌های موجود کافی نیست!', 'error');
            return;
        }
        
        // نمایش انیمیشن
        elements.randomSelectButton.innerHTML = '<span class="loading-spinner"></span> در حال انتخاب تصادفی...';
        elements.randomSelectButton.disabled = true;
        
        setTimeout(() => {
            // پاک کردن انتخاب‌های قبلی
            selectedTeams = [];
            availableCountries = [...ALL_COUNTRIES];
            
            // انتخاب تصادفی ۱۶ تیم
            const shuffled = [...availableCountries].sort(() => Math.random() - 0.5);
            selectedTeams = shuffled.slice(0, 16);
            availableCountries = availableCountries.filter(c => !selectedTeams.some(t => t.name === c.name));
            
            updateUI();
            
            // بازگرداندن دکمه
            elements.randomSelectButton.innerHTML = '<i class="fas fa-random"></i> <span>انتخاب تصادفی ۱۶ تیم</span>';
            elements.randomSelectButton.disabled = false;
            
            showNotification('۱۶ تیم به صورت تصادفی انتخاب شدند!', 'success');
        }, 800);
    }
    
    function updateUI() {
        renderAvailableTeams();
        renderSelectedTeams();
    }
    
    // --- تابع‌های گروه‌بندی ---
    function handleGrouping() {
        if (selectedTeams.length !== 16) {
            showNotification('لطفاً ابتدا ۱۶ تیم انتخاب کنید!', 'warning');
            return;
        }
        
        // نمایش حالت لودینگ
        elements.groupingButton.innerHTML = '<span class="loading-spinner"></span> در حال گروه‌بندی...';
        elements.groupingButton.disabled = true;
        
        setTimeout(() => {
            // تصادفی کردن تیم‌ها
            const shuffledTeams = [...selectedTeams].sort(() => Math.random() - 0.5);
            tournamentGroups = { 'A': [], 'B': [], 'C': [], 'D': [] };
            
            // تقسیم به ۴ گروه
            shuffledTeams.forEach((team, index) => {
                const groupKey = Object.keys(tournamentGroups)[index % 4];
                tournamentGroups[groupKey].push(team);
            });
            
            // نمایش گروه‌ها
            renderGroupTables();
            
            // نمایش بخش نتایج
            elements.resultsSection.classList.remove('hidden');
            elements.knockoutStageSection.classList.add('hidden');
            
            // بازگرداندن دکمه
            elements.groupingButton.innerHTML = '<i class="fas fa-layer-group"></i> <span>۱. گروه‌بندی تیم‌ها</span>';
            elements.groupingButton.disabled = true;
            elements.startSimulationButton.classList.remove('hidden');
            elements.startSimulationButton.disabled = false;
            
            // اسکرول به بخش نتایج
            elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
            showNotification('تیم‌ها با موفقیت در ۴ گروه تقسیم شدند!', 'success');
        }, 1000);
    }
    
    // --- تابع‌های شبیه‌سازی ---
    // این تابع واقع‌گرایانه‌تر را جایگزین کنید:
function simulateMatch(team1, team2) {
    // تفاوت ریتینگ (تیم 1 - تیم 2)
    const ratingDiff = team1.rating - team2.rating;
    
    // شانس پیروزی تیم 1 بر اساس تفاوت ریتینگ
    let winChance1;
    if (ratingDiff > 20) winChance1 = 0.75; // تیم 1 خیلی قوی‌تر
    else if (ratingDiff > 10) winChance1 = 0.65;
    else if (ratingDiff > 5) winChance1 = 0.58;
    else if (ratingDiff > -5) winChance1 = 0.50; // تقریباً برابر
    else if (ratingDiff > -10) winChance1 = 0.42;
    else if (ratingDiff > -20) winChance1 = 0.35;
    else winChance1 = 0.25; // تیم 2 خیلی قوی‌تر
    
    const random = Math.random();
    
    let score1 = 0, score2 = 0;
    
    // 25% شانس مساوی
    if (random < 0.25) {
        const drawRandom = Math.random();
        if (drawRandom < 0.4) { // 0-0
            score1 = 0; score2 = 0;
        } else if (drawRandom < 0.7) { // 1-1
            score1 = 1; score2 = 1;
        } else { // 2-2
            score1 = 2; score2 = 2;
        }
    } 
    // تیم 1 برنده
    else if (random < 0.25 + winChance1 * 0.75) {
        const winType = Math.random();
        if (winType < 0.35) { // 1-0 (35%)
            score1 = 1; score2 = 0;
        } else if (winType < 0.65) { // 2-1 (30%)
            score1 = 2; score2 = 1;
        } else if (winType < 0.85) { // 2-0 (20%)
            score1 = 2; score2 = 0;
        } else if (winType < 0.95) { // 3-1 (10%)
            score1 = 3; score2 = 1;
        } else { // 3-0 (5%)
            score1 = 3; score2 = 0;
        }
    } 
    // تیم 2 برنده
    else {
        const winType = Math.random();
        if (winType < 0.35) { // 0-1 (35%)
            score1 = 0; score2 = 1;
        } else if (winType < 0.65) { // 1-2 (30%)
            score1 = 1; score2 = 2;
        } else if (winType < 0.85) { // 0-2 (20%)
            score1 = 0; score2 = 2;
        } else if (winType < 0.95) { // 1-3 (10%)
            score1 = 1; score2 = 3;
        } else { // 0-3 (5%)
            score1 = 0; score2 = 3;
        }
    }
    
    // اعمال تاثیر ریتینگ روی گل‌ها
    if (ratingDiff > 15) {
        // تیم قوی‌تر شانس گل بیشتری دارد
        if (Math.random() < 0.3) score1 = Math.min(score1 + 1, 4);
        if (Math.random() < 0.2) score2 = Math.max(score2 - 1, 0);
    } else if (ratingDiff < -15) {
        if (Math.random() < 0.3) score2 = Math.min(score2 + 1, 4);
        if (Math.random() < 0.2) score1 = Math.max(score1 - 1, 0);
    }
    
    // 10% شانس گل تصادفی
    if (Math.random() < 0.1) {
        if (Math.random() > 0.5) {
            score1 = Math.min(score1 + 1, 4);
        } else {
            score2 = Math.min(score2 + 1, 4);
        }
    }
    
    return [score1, score2];
}
    
    function handleSimulation() {
        if (!tournamentGroups) {
            showNotification('لطفاً ابتدا گروه‌بندی را انجام دهید!', 'warning');
            return;
        }
        
        // نمایش حالت لودینگ
        elements.startSimulationButton.innerHTML = '<span class="loading-spinner"></span> در حال شبیه‌سازی...';
        elements.startSimulationButton.disabled = true;
        
        setTimeout(() => {
            groupStageMatches = [];
            teamStats = {};
            knockoutStageMatches = [];
            
            // Initialize stats
            selectedTeams.forEach(team => {
                teamStats[team.name] = {
                    played: 0,
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    gf: 0,
                    ga: 0,
                    gd: 0,
                    points: 0,
                    group: null
                };
            });
            
            // تعیین گروه هر تیم
            for (const groupName in tournamentGroups) {
                tournamentGroups[groupName].forEach(team => {
                    teamStats[team.name].group = groupName;
                });
            }
            
            // Simulate group matches
            for (const groupName in tournamentGroups) {
                const teamsInGroup = tournamentGroups[groupName];
                
                for (let i = 0; i < teamsInGroup.length; i++) {
                    for (let j = i + 1; j < teamsInGroup.length; j++) {
                        const team1 = teamsInGroup[i];
                        const team2 = teamsInGroup[j];
                        
                        const [score1, score2] = simulateMatch(team1, team2);
                        
                        const match = {
                            team1: team1,
                            team2: team2,
                            score1: score1,
                            score2: score2,
                            stage: 'group',
                            group: groupName
                        };
                        
                        groupStageMatches.push(match);
                        updateTeamStats(team1, team2, score1, score2);
                    }
                }
            }
            
            // Calculate goal difference
            Object.values(teamStats).forEach(stats => {
                stats.gd = stats.gf - stats.ga;
            });
            
            // Run knockout stage
            const bracketData = runKnockoutStage();
            currentChampion = bracketData.champion;
            knockoutStageMatches = [
                ...bracketData.quarter,
                ...bracketData.semi,
                ...bracketData.final
            ];
            
            // Render group tables
            renderGroupTables();
            
            // Render bracket
            renderBracket(bracketData);
            elements.knockoutStageSection.classList.remove('hidden');
            
            // Save tournament
            saveTournament(bracketData);
            
            // Restore button
            elements.startSimulationButton.innerHTML = '<i class="fas fa-play-circle"></i> <span>۲. شروع شبیه‌سازی</span>';
            elements.startSimulationButton.disabled = false;
            
            showNotification('تورنمنت با موفقیت شبیه‌سازی شد!', 'success');
        }, 2000);
    }
    
    function updateTeamStats(team1, team2, score1, score2) {
        const stats1 = teamStats[team1.name];
        const stats2 = teamStats[team2.name];
        
        stats1.played++;
        stats2.played++;
        stats1.gf += score1;
        stats1.ga += score2;
        stats2.gf += score2;
        stats2.ga += score1;
        
        if (score1 > score2) {
            stats1.wins++;
            stats1.points += 3;
            stats2.losses++;
        } else if (score2 > score1) {
            stats2.wins++;
            stats2.points += 3;
            stats1.losses++;
        } else {
            stats1.draws++;
            stats2.draws++;
            stats1.points++;
            stats2.points++;
        }
    }
    
    // --- تابع‌های مرحله حذفی ---
    function runKnockoutStage() {
        const advancingTeams = {};
        
        // Determine advancing teams from each group
        for (const groupName in tournamentGroups) {
            const sorted = [...tournamentGroups[groupName]].sort((a, b) => {
                const statsA = teamStats[a.name];
                const statsB = teamStats[b.name];
                
                // Sort by points, then goal difference, then goals for
                if (statsB.points !== statsA.points) return statsB.points - statsA.points;
                if (statsB.gd !== statsA.gd) return statsB.gd - statsA.gd;
                return statsB.gf - statsA.gf;
            });
            
            advancingTeams[`${groupName}1`] = sorted[0];
            advancingTeams[`${groupName}2`] = sorted[1];
        }
        
        // Quarter-finals
        const quarterFinals = [
            { t1: advancingTeams.A1, t2: advancingTeams.B2 },
            { t1: advancingTeams.C1, t2: advancingTeams.D2 },
            { t1: advancingTeams.B1, t2: advancingTeams.A2 },
            { t1: advancingTeams.D1, t2: advancingTeams.C2 }
        ];
        
        const quarterResults = simulateKnockoutMatches(quarterFinals, 'quarter');
        
        // Semi-finals
        const semiFinals = [
            { t1: quarterResults.winners[0], t2: quarterResults.winners[1] },
            { t1: quarterResults.winners[2], t2: quarterResults.winners[3] }
        ];
        
        const semiResults = simulateKnockoutMatches(semiFinals, 'semi');
        
        // Final
        const final = [{ t1: semiResults.winners[0], t2: semiResults.winners[1] }];
        const finalResult = simulateKnockoutMatches(final, 'final');
        
        return {
            quarter: quarterResults.matches,
            semi: semiResults.matches,
            final: finalResult.matches,
            champion: finalResult.winners[0] || null
        };
    }
    
    function simulateKnockoutMatches(matchups, stage) {
        const winners = [];
        const matches = [];
        
        matchups.forEach(match => {
            let score1, score2;
            let attempts = 0;
            
            // Ensure there's a winner (no draws in knockout)
            do {
                [score1, score2] = simulateMatch(match.t1, match.t2);
                attempts++;
                
                // If still draw after 3 attempts, add extra time
                if (attempts > 3 && score1 === score2) {
                    if (Math.random() > 0.5) {
                        score1 += 1;
                    } else {
                        score2 += 1;
                    }
                }
            } while (score1 === score2);
            
            const winner = score1 > score2 ? match.t1 : match.t2;
            winners.push(winner);
            
            matches.push({
                team1: match.t1,
                team2: match.t2,
                score1: score1,
                score2: score2,
                winner: winner,
                stage: stage
            });
        });
        
        return { matches, winners };
    }
    
    // --- تابع‌های نمایش جداول ---
    function renderGroupTables() {
        elements.groupTablesContainer.innerHTML = '';
        
        for (const groupName in tournamentGroups) {
            const card = document.createElement('div');
            card.className = 'group-table-card';
            
            const sortedTeams = [...tournamentGroups[groupName]].sort((a, b) => {
                const statsA = teamStats[a.name];
                const statsB = teamStats[b.name];
                
                if (!statsA || !statsB) return 0;
                
                if (statsB.points !== statsA.points) return statsB.points - statsA.points;
                if (statsB.gd !== statsA.gd) return statsB.gd - statsA.gd;
                return statsB.gf - statsA.gf;
            });
            
            let tableHTML = `
                <h4><i class="fas fa-table"></i> گروه ${groupName}</h4>
                <table class="group-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>تیم</th>
                            <th>بازی</th>
                            <th>برد</th>
                            <th>مساوی</th>
                            <th>باخت</th>
                            <th>امتیاز</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            sortedTeams.forEach((team, index) => {
                const stats = teamStats[team.name] || { played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, gd: 0, points: 0 };
                const rankClass = index < 2 ? 'qualifying' : 'eliminated';
                
                tableHTML += `
                    <tr>
                        <td><span class="rank ${rankClass}">${index + 1}</span></td>
                        <td>
                            <span class="clickable-team" data-team-name="${team.name}">
                                <img src="${team.flag}" alt="${team.name}" class="team-flag-small">
                                ${team.name}
                            </span>
                        </td>
                        <td>${stats.played}</td>
                        <td>${stats.wins}</td>
                        <td>${stats.draws}</td>
                        <td>${stats.losses}</td>
                        <td class="points">${stats.points}</td>
                    </tr>
                `;
            });
            
            tableHTML += '</tbody></table>';
            card.innerHTML = tableHTML;
            elements.groupTablesContainer.appendChild(card);
        }
        
        // Add event listeners to clickable teams
        document.querySelectorAll('.clickable-team').forEach(teamElement => {
            teamElement.addEventListener('click', function() {
                const teamName = this.dataset.teamName;
                showTeamMatchesModal(teamName);
            });
        });
    }
    
    // --- تابع‌های مودال نمایش بازی‌ها ---
    function showTeamMatchesModal(teamName) {
        const team = selectedTeams.find(t => t.name === teamName);
        
        if (!team) {
            showNotification('تیم مورد نظر یافت نشد!', 'error');
            return;
        }
        
        // Find all matches for this team
        const allMatches = [...groupStageMatches, ...knockoutStageMatches];
        const matches = allMatches.filter(match => 
            match.team1.name === teamName || match.team2.name === teamName
        );
        
        // Update modal title
        elements.modalTeamFlag.innerHTML = `<img src="${team.flag}" alt="${team.name}" style="width: 45px; height: 30px; border-radius: 4px; margin-left: 10px;">`;
        elements.modalTeamName.textContent = team.name;
        
        // Clear matches list
        elements.matchesList.innerHTML = '';
        
        if (matches.length === 0) {
            elements.matchesList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-info-circle"></i>
                    </div>
                    <h4>بازی‌ای برای نمایش یافت نشد</h4>
                    <p>این تیم هنوز در هیچ بازی‌ای شرکت نکرده است</p>
                </div>
            `;
        } else {
            matches.forEach(match => {
                const isTeam1 = match.team1.name === teamName;
                const isWinner = isTeam1 ? match.score1 > match.score2 : match.score2 > match.score1;
                const isDraw = match.score1 === match.score2;
                
                // Determine match stage name
                let stageName = '';
                switch(match.stage) {
                    case 'group':
                        stageName = `مرحله گروهی (گروه ${match.group || 'نامشخص'})`;
                        break;
                    case 'quarter':
                        stageName = 'یک‌چهارم نهایی';
                        break;
                    case 'semi':
                        stageName = 'نیمه‌نهایی';
                        break;
                    case 'final':
                        stageName = 'فینال';
                        break;
                    default:
                        stageName = 'مرحله نامشخص';
                }
                
                const matchCard = document.createElement('div');
                matchCard.className = 'match-card';
                matchCard.innerHTML = `
                    <div class="match-teams">
                        <div class="team-display ${isTeam1 && isWinner ? 'winner' : ''}">
                            <img src="${match.team1.flag}" alt="${match.team1.name}" class="team-flag">
                            <span class="team-name">${match.team1.name}</span>
                            <span class="team-score">${match.score1}</span>
                        </div>
                        <div class="match-score">
                            <span>${match.score1}</span>
                            <span class="match-divider">-</span>
                            <span>${match.score2}</span>
                        </div>
                        <div class="team-display ${!isTeam1 && isWinner ? 'winner' : ''}">
                            <img src="${match.team2.flag}" alt="${match.team2.name}" class="team-flag">
                            <span class="team-name">${match.team2.name}</span>
                            <span class="team-score">${match.score2}</span>
                        </div>
                    </div>
                    <div class="match-info">
                        <span class="match-result ${isWinner ? 'win' : isDraw ? 'draw' : 'loss'}">
                            ${isWinner ? 'پیروزی' : isDraw ? 'مساوی' : 'شکست'}
                        </span>
                        <span style="color: var(--text-secondary); font-size: 0.95em;">
                            <i class="fas fa-calendar"></i> ${stageName}
                        </span>
                    </div>
                `;
                elements.matchesList.appendChild(matchCard);
            });
        }
        
        // Show modal
        elements.matchesModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // --- تابع‌های نمودار درختی ---
    function renderBracket(bracketData) {
        if (!bracketData) return;
        
        elements.bracketContainer.innerHTML = '';
        
        // Quarter-finals
        if (bracketData.quarter && bracketData.quarter.length > 0) {
            const quarterRound = createBracketRound('یک‌چهارم نهایی', bracketData.quarter);
            elements.bracketContainer.appendChild(quarterRound);
        }
        
        // Semi-finals
        if (bracketData.semi && bracketData.semi.length > 0) {
            const semiRound = createBracketRound('نیمه‌نهایی', bracketData.semi);
            elements.bracketContainer.appendChild(semiRound);
        }
        
        // Final
        if (bracketData.final && bracketData.final.length > 0) {
            const finalRound = createBracketRound('فینال', bracketData.final);
            elements.bracketContainer.appendChild(finalRound);
        }
        
        // Champion
        if (bracketData.champion) {
            const championDiv = document.createElement('div');
            championDiv.className = 'champion-container';
            championDiv.innerHTML = `
                <div class="champion-box">
                    <div class="trophy">🏆</div>
                    <div class="champion-title">قهرمان جام جهانی</div>
                    <img src="${bracketData.champion.flag}" alt="${bracketData.champion.name}" class="champion-flag">
                    <div class="champion-name">${bracketData.champion.name}</div>
                </div>
            `;
            elements.bracketContainer.appendChild(championDiv);
        }
    }
    
    function createBracketRound(title, matches) {
        const roundDiv = document.createElement('div');
        roundDiv.className = 'bracket-round';
        roundDiv.innerHTML = `<div class="bracket-round-title">${title}</div>`;
        
        matches.forEach(match => {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'bracket-match';
            matchDiv.innerHTML = `
                <div class="team ${match.winner.name === match.team1.name ? 'winner' : 'loser'}">
                    <div class="team-info">
                        <img src="${match.team1.flag}" alt="${match.team1.name}" class="team-flag">
                        <span class="name">${match.team1.name}</span>
                    </div>
                    <span class="score">${match.score1}</span>
                </div>
                <div class="team ${match.winner.name === match.team2.name ? 'winner' : 'loser'}">
                    <div class="team-info">
                        <img src="${match.team2.flag}" alt="${match.team2.name}" class="team-flag">
                        <span class="name">${match.team2.name}</span>
                    </div>
                    <span class="score">${match.score2}</span>
                </div>
            `;
            roundDiv.appendChild(matchDiv);
        });
        
        return roundDiv;
    }
    
    // --- تابع‌های تاریخچه ---
    async function loadHistoryFromAPI() {
        try {
            const response = await fetch(API_URL, { credentials: 'same-origin' });
            if (response.status === 401) { window.location.replace('index.html'); return; }
            
            if (!response.ok) {
                throw new Error(`خطا در دریافت تاریخچه: ${response.status}`);
            }
            
            const data = await response.json();
            updateHistoryDropdown(data);
            
        } catch (error) {
            console.error('Error loading history:', error);
            showNotification('خطا در بارگذاری تاریخچه!', 'error');
        }
    }
    
    function updateHistoryDropdown(history) {
        elements.historySelector.innerHTML = '<option value="">یک دوره را انتخاب کنید...</option>';
        elements.deleteHistoryButton.disabled = true;
        
        if (!history || history.length === 0) {
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "هیچ تورنمنتی یافت نشد";
            option.disabled = true;
            elements.historySelector.appendChild(option);
            return;
        }
        
        history.forEach(tournament => {
            const option = document.createElement('option');
            option.value = tournament.id;
            
            const date = new Date(tournament.date).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const championName = tournament.champion?.name || 'نامشخص';
            option.textContent = `دوره ${date} - قهرمان: ${championName}`;
            option.dataset.tournamentData = JSON.stringify(tournament.data);
            elements.historySelector.appendChild(option);
        });
        
        // Enable delete button when a tournament is selected
        elements.historySelector.addEventListener('change', function() {
            elements.deleteHistoryButton.disabled = !this.value;
            if (this.value) {
                elements.historyInfo.classList.add('active');
            } else {
                elements.historyInfo.classList.remove('active');
            }
        });
    }
    
    async function deleteSelectedTournament() {
        const selectedId = elements.historySelector.value;
        
        if (!selectedId) {
            showNotification('لطفاً یک دوره را انتخاب کنید!', 'warning');
            return;
        }
        
        if (!confirm('آیا از حذف این دوره مطمئن هستید؟ این عمل قابل بازگشت نیست.')) {
            return;
        }
        
        try {
            elements.deleteHistoryButton.innerHTML = '<span class="loading-spinner"></span> در حال حذف...';
            elements.deleteHistoryButton.disabled = true;
            
            const response = await fetch(`${API_URL}?id=${encodeURIComponent(selectedId)}`, {
                method: 'DELETE',
                credentials: 'same-origin'
            });
            
            if (!response.ok) {
                throw new Error(`خطا در حذف: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.error) {
                throw new Error(result.error);
            }
            
            showNotification('دوره با موفقیت حذف شد!', 'success');
            await loadHistoryFromAPI();
            
        } catch (error) {
            console.error('Error deleting tournament:', error);
            showNotification(`خطا در حذف دوره: ${error.message}`, 'error');
        } finally {
            elements.deleteHistoryButton.innerHTML = '<i class="fas fa-trash"></i> <span>حذف دوره انتخابی</span>';
        }
    }
    
    async function saveTournament(bracketData) {
        const tournamentData = {
            date: new Date().toISOString(),
            teams: selectedTeams,
            groups: tournamentGroups,
            stats: teamStats,
            champion: bracketData.champion,
            groupMatches: groupStageMatches,
            bracket: bracketData,
            knockoutMatches: knockoutStageMatches
        };
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tournamentData)
            });
            
            if (!response.ok) {
                throw new Error(`خطا در ذخیره: ${response.status}`);
            }
            
            const result = await response.json();
            if (result.id) {
                currentTournamentId = result.id;
            }
            
            await loadHistoryFromAPI();
            showNotification('تورنمنت با موفقیت ذخیره شد!', 'success');
            
        } catch (error) {
            console.error('Error saving tournament:', error);
            showNotification('خطا در ذخیره تورنمنت!', 'error');
        }
    }
    
    // --- مدیریت تم ---
    function initTheme() {
        // بررسی ذخیره شده در localStorage
        const savedTheme = localStorage.getItem('admin-theme');
        
        if (savedTheme === 'light') {
            elements.body.classList.remove('dark-theme');
            elements.body.classList.add('light-theme');
            updateThemeIcon();
        } else {
            // پیش‌فرض تم تیره
            elements.body.classList.remove('light-theme');
            elements.body.classList.add('dark-theme');
            localStorage.setItem('admin-theme', 'dark');
        }
        
        elements.themeToggleBtn.addEventListener('click', function() {
            const isLightTheme = elements.body.classList.contains('light-theme');
            
            if (isLightTheme) {
                // تغییر به تم تیره
                elements.body.classList.remove('light-theme');
                elements.body.classList.add('dark-theme');
                localStorage.setItem('admin-theme', 'dark');
            } else {
                // تغییر به تم روشن
                elements.body.classList.remove('dark-theme');
                elements.body.classList.add('light-theme');
                localStorage.setItem('admin-theme', 'light');
            }
            
            updateThemeIcon();
            
            // انیمیشن چرخش
            this.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            showNotification(`تم ${isLightTheme ? 'تیره' : 'روشن'} فعال شد`, 'info');
        });
    }
    
    function updateThemeIcon() {
        const icon = elements.themeToggleBtn.querySelector('i');
        const isLightTheme = elements.body.classList.contains('light-theme');
        
        if (isLightTheme) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            icon.style.color = '#f59e0b';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            icon.style.color = '#8b5cf6';
        }
    }
    
    // --- تنظیم رویدادها ---
    function setupEventListeners() {
        // Search and filter
        elements.searchInput.addEventListener('input', updateUI);
        elements.continentFilter.addEventListener('change', updateUI);
        
        // Team selection
        elements.randomSelectButton.addEventListener('click', selectRandomTeams);
        elements.groupingButton.addEventListener('click', handleGrouping);
        elements.startSimulationButton.addEventListener('click', handleSimulation);
        
        // History
        elements.loadHistoryButton.addEventListener('click', function() {
            const selectedOption = elements.historySelector.options[elements.historySelector.selectedIndex];
            
            if (!selectedOption || !selectedOption.value) {
                showNotification('لطفاً یک دوره را انتخاب کنید!', 'warning');
                return;
            }
            
            const tournamentData = JSON.parse(selectedOption.dataset.tournamentData);
            loadTournamentFromHistory(tournamentData);
        });
        
        elements.newTournamentButton.addEventListener('click', function() {
            window.location.reload();
        });
        
        elements.deleteHistoryButton.addEventListener('click', deleteSelectedTournament);

        const logoutButton = document.getElementById('logout-button');
        if (logoutButton) logoutButton.addEventListener('click', logout);
        
        // Modal
        elements.closeModalBtn.addEventListener('click', function() {
            elements.matchesModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        elements.matchesModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Back to selection button
        elements.backToSelectionButton.addEventListener('click', function() {
            elements.resultsSection.classList.add('hidden');
            document.getElementById('team-selection-section').scrollIntoView({ behavior: 'smooth' });
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && elements.matchesModal.classList.contains('active')) {
                elements.matchesModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // --- تابع بارگذاری تورنمنت از تاریخچه ---
    function loadTournamentFromHistory(tournamentData) {
        if (!tournamentData) {
            showNotification('داده‌های تورنمنت نامعتبر است!', 'error');
            return;
        }
        
        try {
            // Reset current state
            selectedTeams = tournamentData.teams || [];
            tournamentGroups = tournamentData.groups || {};
            teamStats = tournamentData.stats || {};
            groupStageMatches = tournamentData.groupMatches || [];
            knockoutStageMatches = tournamentData.knockoutMatches || [];
            currentChampion = tournamentData.champion || null;
            
            // Update available teams
            availableCountries = ALL_COUNTRIES.filter(country => 
                !selectedTeams.some(team => team.name === country.name)
            );
            
            // Hide team selection section
            document.getElementById('team-selection-section').classList.add('hidden');
            
            // Show results
            elements.resultsSection.classList.remove('hidden');
            elements.knockoutStageSection.classList.remove('hidden');
            
            // Render tables and bracket
            renderGroupTables();
            
            if (tournamentData.bracket) {
                renderBracket(tournamentData.bracket);
            }
            
            // Disable buttons since tournament is already completed
            elements.groupingButton.disabled = true;
            elements.startSimulationButton.disabled = true;
            
            // Scroll to results
            elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
            
            showNotification('تورنمنت با موفقیت بارگذاری شد!', 'success');
            
        } catch (error) {
            console.error('Error loading tournament:', error);
            showNotification('خطا در بارگذاری تورنمنت!', 'error');
        }
    }
    
    // --- مقداردهی اولیه ---
    async function ensureAuthenticated() {
        try {
            const response = await fetch(`${AUTH_URL}?action=status`, { credentials: 'same-origin' });
            const { authenticated } = response.ok ? await response.json() : { authenticated: false };
            if (!authenticated) {
                window.location.replace('index.html');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Auth check failed:', error);
            showNotification('سرور در دسترس نیست', 'error');
            return false;
        }
    }

    async function logout() {
        try {
            await fetch(`${AUTH_URL}?action=logout`, { method: 'POST', credentials: 'same-origin' });
        } finally {
            window.location.replace('index.html');
        }
    }

    async function init() {
        if (!(await ensureAuthenticated())) return;
        
        // Check if all required elements exist
        for (const [name, element] of Object.entries(elements)) {
            if (!element && name !== 'backToSelectionButton') {
                console.warn(`⚠️ Missing element: ${name}`);
            }
        }
        
        // Initialize components
        updateUI();
        initTheme();
        setupEventListeners();
        
        // Load history
        loadHistoryFromAPI().then(() => {
            console.log('✅ History loaded successfully');
        }).catch(error => {
            console.error('❌ Failed to load history:', error);
        });
        
        // Welcome message
        setTimeout(() => {
            showNotification('به پنل مدیریت جام جهانی خوش آمدید!', 'info');
        }, 1000);
        
        console.log('✅ World Cup Manager initialized successfully');
    }
    
    // شروع برنامه
    init();
});