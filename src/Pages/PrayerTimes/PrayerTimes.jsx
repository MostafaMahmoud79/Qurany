import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const cities = [
  { en: "cairo", ar: "القاهرة" },
  { en: "giza", ar: "الجيزة" },
  { en: "alexandria", ar: "الإسكندرية" },
  { en: "aswan", ar: "أسوان" },
  { en: "asyut", ar: "أسيوط" },
  { en: "luxor", ar: "الأقصر" },
  { en: "ismailia", ar: "الإسماعيلية" },
  { en: "beheira", ar: "البحيرة" },
  { en: "beni_suef", ar: "بني سويف" },
  { en: "port_said", ar: "بورسعيد" },
  { en: "south_sinai", ar: "جنوب سيناء" },
  { en: "dakahlia", ar: "الدقهلية" },
  { en: "damietta", ar: "دمياط" },
  { en: "suez", ar: "السويس" },
  { en: "sharqia", ar: "الشرقية" },
  { en: "gharbia", ar: "الغربية" },
  { en: "faiyum", ar: "الفيوم" },
  { en: "qena", ar: "قنا" },
  { en: "kafr_el_sheikh", ar: "كفر الشيخ" },
  { en: "matruh", ar: "مطروح" },
  { en: "minya", ar: "المنيا" },
  { en: "monufia", ar: "المنوفية" },
  { en: "new_valley", ar: "الوادي الجديد" },
  { en: "north_sinai", ar: "شمال سيناء" },
  { en: "qalyubia", ar: "القليوبية" },
  { en: "sohag", ar: "سوهاج" },
  { en: "red_sea", ar: "البحر الأحمر" }
];

export default function PrayerTimes() {
  const [date, setDate] = useState(null);
  const [prayer, setPrayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("cairo");

  async function getDay() {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const ddate = `${day}-${month}-${year}`;

      const { data } = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity/${ddate}?city=${selectedCity}&country=egypt`
      );
      
      setPrayer(data.data.timings);
      setDate(data.data.date);
    } catch (err) {
      console.log('حدث خطأ في جلب البيانات:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDay();
    
    const interval = setInterval(() => {
      const now = new Date();
      const currentDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const fetchedDate = date ? `${date.hijri.year}-${String(date.hijri.month).padStart(2, '0')}-${String(date.hijri.day).padStart(2, '0')}` : '';

      if (currentDate !== fetchedDate) {
        getDay();
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  const formatTime = (time) => {
    if (!time) return "--:--";
    const [hours, minutes] = time.split(':');
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes}`;
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setLoading(true);
  };

  if (loading) return <div className="text-center my-5"><h2>جاري التحميل...</h2></div>;

  return (
    <>
      <Helmet>
        <meta name="description" content="اوقات الصلاة حسب المحافظة المصرية" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>مواقيت الصلاة</title>
      </Helmet>

      <main className='my-5'>
        <div className="container">
          <div className="text-center">
            <h1 className="display-4 fs-1 mb-4">
              أوقات الصلاة في {cities.find(city => city.en === selectedCity)?.ar}
            </h1>
            
            {/* قائمة المحافظات متجاوبة */}
            <div className="row justify-content-center my-4">
              <div className="col-12 col-md-6 col-lg-4">
                <select 
                  className="form-select w-100 mx-auto py-2 fs-5 text-center"
                  onChange={handleCityChange}
                  value={selectedCity}
                >
                  {cities.map((city) => (
                    <option key={city.en} value={city.en}>
                      {city.ar}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <h2 className="lead fs-4">تاريخ اليوم: {date?.readable}</h2>
            <h3 className="text-muted">
              اليوم {date?.gregorian?.weekday?.ar} ({date?.gregorian?.weekday?.en})
            </h3>
          </div>
          
          <div className="row justify-content-center mt-4">
            <div className="col-md-8 col-lg-6">
              <div className="bg-light rounded-3 shadow p-4">
                <div className='prayer-times'>
                  <div className="d-flex flex-column gap-3">
                    <div className="p-2 bg-white rounded shadow-sm">
                      <h4 className="mb-0">الفجر: {formatTime(prayer?.Fajr)}</h4>
                    </div>
                    <div className="p-2 bg-white rounded shadow-sm">
                      <h4 className="mb-0">الظهر: {formatTime(prayer?.Dhuhr)}</h4>
                    </div>
                    <div className="p-2 bg-white rounded shadow-sm">
                      <h4 className="mb-0">العصر: {formatTime(prayer?.Asr)}</h4>
                    </div>
                    <div className="p-2 bg-white rounded shadow-sm">
                      <h4 className="mb-0">المغرب: {formatTime(prayer?.Maghrib)}</h4>
                    </div>
                    <div className="p-2 bg-white rounded shadow-sm">
                      <h4 className="mb-0">العشاء: {formatTime(prayer?.Isha)}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}