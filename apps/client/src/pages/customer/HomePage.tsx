import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Play,
  Star,
  Sprout,
  Droplets,
  Thermometer,
  Grid3X3,
  Video,
  ShieldCheck,
  Truck,
  Layers,
  Scale,
  Clock,
  X,
} from "lucide-react";

interface CropItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  scientificName: string;
  description: string;
  harvestCycle: string;
  expectedYield: string;
  soilType: string;
  image: string;
}

const CROPS_DATA: CropItem[] = [
  {
    id: "spinach",
    badge: "Bán chạy nhất",
    badgeColor: "bg-emerald-500/90 text-white",
    title: "Cải bó xôi Nhật (Spinach)",
    scientificName: "Spinacia oleracea",
    description: "Hàm lượng sắt cao, ngọt tự nhiên khi nấu chín hoặc ép nước tươi mát.",
    harvestCycle: "40 ngày",
    expectedYield: "15 – 20 kg / vụ",
    soilType: "Bazan Organic 100%",
    image: "/images/spinach.jpg",
  },
  {
    id: "rainbow-chard",
    badge: "Dinh dưỡng cao",
    badgeColor: "bg-amber-500/90 text-white",
    title: "Cải cầu vồng Thụy Sĩ (Rainbow Chard)",
    scientificName: "Beta vulgaris subsp. vulgaris",
    description: "Giàu Vitamin A, C, khoáng chất vi lượng, màu sắc sống động bừng sáng bàn ăn.",
    harvestCycle: "45 ngày",
    expectedYield: "18 – 22 kg / vụ",
    soilType: "Bazan Phù Sa Mịn",
    image: "/images/rainbow_chard.jpg",
  },
  {
    id: "butterhead-lettuce",
    badge: "Dễ chăm sóc",
    badgeColor: "bg-teal-500/90 text-white",
    title: "Xà lách búp mỡ Đà Lạt",
    scientificName: "Lactuca sativa var. capitata",
    description: "Lá mỏng giòn béo, vị ngọt mát tự nhiên phù hợp món salad chuẩn hữu cơ mỗi ngày.",
    harvestCycle: "45 ngày (Ngắn)",
    expectedYield: "12 – 16 kg / vụ",
    soilType: "Giá thể xơ dừa sinh học",
    image: "/images/butterhead_lettuce.jpg",
  },
];

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

const STEPS_DATA: StepItem[] = [
  {
    step: "01",
    title: "Chọn ô đất & Giống rau",
    description: "Lựa chọn diện tích 15m² – 20m² theo nhu cầu tiêu dùng và danh mục rau mùa vụ yêu thích của gia đình.",
    icon: <Grid3X3 className="h-5 w-5 text-emerald-600" />,
    iconBg: "bg-emerald-50 border-emerald-200",
  },
  {
    step: "02",
    title: "Camera Live 24/7 & IoT",
    description: "Giám sát độ ẩm, nhiệt độ theo thời gian thực và xem trực tiếp toàn cảnh hạt mầm đâm chồi qua camera Full HD.",
    icon: <Video className="h-5 w-5 text-blue-600" />,
    iconBg: "bg-blue-50 border-blue-200",
  },
  {
    step: "03",
    title: "Chăm sóc chuẩn hữu cơ",
    description: "Kỹ sư bản địa bón phân trùn quế, nhổ cỏ thủ công, bắt sâu và chụp ảnh nghiệm thu định kỳ gửi về ứng dụng.",
    icon: <ShieldCheck className="h-5 w-5 text-amber-600" />,
    iconBg: "bg-amber-50 border-amber-200",
  },
  {
    step: "04",
    title: "Thu hoạch & Giao tận nhà",
    description: "Nông sản thu hái lúc 5h sáng, đóng thùng kèm phân hủy sinh học và giao nhanh qua Agri Express trong 24 giờ.",
    icon: <Truck className="h-5 w-5 text-indigo-600" />,
    iconBg: "bg-indigo-50 border-indigo-200",
  },
];

interface TestimonialItem {
  id: string;
  stars: number;
  quote: string;
  image: string;
  author: string;
  location: string;
  badge: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "review-1",
    stars: 5,
    quote: "“Rau thu hoạch từ Đà Lạt đến 20h là ngập tràn tủ, các con rất hào hứng với việc mở camera xem rau lớn từng ngày! Cảm giác an tâm tuyệt đối về sức khỏe gia đình.”",
    image: "/images/review_delivery.jpg",
    author: "Chị Minh Anh",
    location: "Quận 7, TP. Hồ Chí Minh",
    badge: "HĐ-1582 • Có camera riêng",
  },
  {
    id: "review-2",
    stars: 5,
    quote: "“Dịch vụ giao hàng cực nhanh, rau vừa hái còn nguyên sương lúc 5h sáng từ Đạ Sar gửi về tới tận bàn ăn vào trưa thứ Bảy. Cả nhà ai cũng khen thơm nức mũi.”",
    image: "/images/review_dinner.jpg",
    author: "Anh Toàn Nam",
    location: "Cầu Giấy, Hà Nội",
    badge: "HĐ-2041 • Gói 6 tháng",
  },
  {
    id: "review-3",
    stars: 5,
    quote: "“Giao diện quản lý cực kỳ trực quan. Cả nhà đi du lịch và ở xa vẫn check được trạm tưới, hàm lượng ẩm của rau, như có người làm vườn riêng vậy.”",
    image: "/images/review_produce.jpg",
    author: "Bác Lê Thanh",
    location: "Hải Châu, Đà Nẵng",
    badge: "HĐ-0914 • Vụ sinh thái",
  },
];

export function HomePage() {
  const navigate = useNavigate();

  // Dynamic live clock for camera feed
  const [liveTime, setLiveTime] = React.useState("14:28:05");
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setLiveTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Crops active slide index
  const [activeCropIndex, setActiveCropIndex] = React.useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);

  const handlePrevCrop = () => {
    setActiveCropIndex((prev) => (prev > 0 ? prev - 1 : CROPS_DATA.length - 1));
  };

  const handleNextCrop = () => {
    setActiveCropIndex((prev) => (prev < CROPS_DATA.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="w-full space-y-20 lg:space-y-28 py-4 sm:py-6">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Hero Text & CTAs */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-2xs">
            <Sprout className="h-4 w-4 text-emerald-600" />
            <span>Nông nghiệp số tuần hoàn tại Đà Lạt</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]">
            Sở hữu vườn rau hữu cơ riêng của bạn – Canh tác bởi chuyên gia, giám sát 24/7 từ xa
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
            Trải nghiệm cảm giác làm chủ nông trại chuẩn sinh thái tại Đạ Sar – Đà Lạt. Đội ngũ kỹ sư chăm sóc tận tâm, hệ thống camera & IoT truyền dữ liệu trực tiếp đến điện thoại gia đình bạn mỗi ngày.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/plots")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1b4332] hover:bg-[#143427] text-white px-7 py-3.5 text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 group active:scale-98"
            >
              <span>Khám phá ô đất trồng ngay</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 px-6 py-3.5 text-sm sm:text-base font-semibold shadow-2xs transition-all duration-200 active:scale-98"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Play className="h-3 w-3 fill-current ml-0.5" />
              </span>
              <span>Xem Video Vườn & Camera Live</span>
            </button>
          </div>

          {/* Social Proof Avatars & Rating */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-100 w-full sm:w-auto">
            <div className="flex -space-x-2.5 overflow-hidden">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-2xs"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Khách hàng Thu Hà"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-2xs"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Khách hàng Minh Trí"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover shadow-2xs"
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                alt="Khách hàng Lan Anh"
              />
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-[11px] font-bold text-emerald-800 ring-2 ring-white shadow-2xs">
                +1.2k
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-sm font-bold text-slate-900">4.9/5</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Từ 1.200+ gia đình thành thị tin dùng
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Tech Live Camera Feed Mockup */}
        <div className="lg:col-span-6 xl:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950 group">
            {/* Camera View Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
              <img
                src="/images/greenhouse_camera_live.jpg"
                alt="Camera trực tiếp nông trại Đà Lạt"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/50 pointer-events-none" />

              {/* Top Bar: LIVE Status + Bed ID + Time */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full bg-rose-600/90 text-white px-2.5 py-1 text-[11px] font-bold tracking-wider backdrop-blur-md shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                    <span>LIVE | 1080P</span>
                  </div>
                  <div className="hidden sm:inline-block rounded-full bg-black/60 text-white/90 px-3 py-1 text-xs font-medium backdrop-blur-md border border-white/10">
                    Luống RA - 102 (Đà Lạt)
                  </div>
                </div>

                <div className="rounded-full bg-black/60 text-emerald-400 font-mono text-xs font-semibold px-3 py-1 backdrop-blur-md border border-white/10 shadow-xs">
                  {liveTime}
                </div>
              </div>

              {/* Click to expand overlay hint */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30 backdrop-blur-[2px]"
                aria-label="Phóng to camera live"
              >
                <div className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">
                  <Play className="h-3.5 w-3.5 fill-current text-emerald-600" />
                  <span>Xem trực tiếp toàn màn hình</span>
                </div>
              </button>

              {/* Bottom Sensor Overlay Floating Cards */}
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3 pointer-events-auto">
                <div className="rounded-2xl bg-white/95 backdrop-blur-md p-3 border border-white/40 shadow-lg flex items-center gap-2.5 transition-transform hover:-translate-y-0.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 shrink-0">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500 font-medium truncate">Độ ẩm đất</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      68% <span className="text-[10px] font-normal text-emerald-600">(Chuẩn)</span>
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/95 backdrop-blur-md p-3 border border-white/40 shadow-lg flex items-center gap-2.5 transition-transform hover:-translate-y-0.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shrink-0">
                    <Thermometer className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500 font-medium truncate">Nhiệt độ</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">24.2 °C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: MÙA VỤ THU ĐÔNG (Seasonal Crops)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-xs font-bold tracking-wider text-amber-700 uppercase">
              MÙA VỤ THU ĐÔNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Giống rau mùa vụ chuẩn bị gieo trồng
            </h2>
            <p className="text-sm text-slate-500 max-w-xl">
              Được tuyển chọn sinh học, thích nghi tuyệt đối với thổ nhưỡng đất đỏ bazan Lạc Dương.
            </p>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={handlePrevCrop}
              aria-label="Giống rau trước"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNextCrop}
              aria-label="Giống rau tiếp theo"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b4332] text-white hover:bg-[#143427] transition-colors shadow-2xs"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 3 Crop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CROPS_DATA.map((crop) => (
            <div
              key={crop.id}
              className="group flex flex-col rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container with Badge */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={crop.image}
                  alt={crop.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Top Badge */}
                <span
                  className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-md shadow-xs ${crop.badgeColor}`}
                >
                  {crop.badge}
                </span>
              </div>

              {/* Content Details */}
              <div className="flex flex-col flex-1 pt-4 pb-2 space-y-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {crop.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 min-h-[32px] leading-relaxed">
                    {crop.description}
                  </p>
                </div>

                {/* Specs list */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      Chu kỳ thu hoạch
                    </span>
                    <span className="font-semibold text-slate-800">{crop.harvestCycle}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Scale className="h-3.5 w-3.5 text-slate-400" />
                      Sản lượng dự kiến
                    </span>
                    <span className="font-semibold text-slate-800">{crop.expectedYield}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Layers className="h-3.5 w-3.5 text-slate-400" />
                      Thổ nhưỡng
                    </span>
                    <span className="font-semibold text-slate-800">{crop.soilType}</span>
                  </div>
                </div>

                {/* Card Button */}
                <div className="pt-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => navigate("/plots")}
                    className="w-full rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/90 text-indigo-700 py-3 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Chọn gieo giống này</span>
                    <span className="text-xs">↗</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {CROPS_DATA.map((crop, idx) => (
            <button
              key={crop.id}
              type="button"
              onClick={() => setActiveCropIndex(idx)}
              aria-label={`Chuyển đến giống rau ${crop.title}`}
              className={
                idx === activeCropIndex
                  ? "h-2 w-8 rounded-full bg-emerald-800 transition-all cursor-pointer"
                  : "h-2 w-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all cursor-pointer"
              }
            />
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: MÔ HÌNH MINH BẠCH (4-Step Process)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8 text-center">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase">
            MÔ HÌNH MINH BẠCH
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Hành trình nông trại từ xa trong 4 bước
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Kết nối trực tiếp các hộ gia đình với đất canh tác thông qua từng luống và chuyên gia bản địa.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
          {STEPS_DATA.map((item) => (
            <div
              key={item.step}
              className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Header with big number and icon */}
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-slate-300 tracking-tight">
                  {item.step}
                </span>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${item.iconBg}`}
                >
                  {item.icon}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-slate-900 mt-5 mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: NIỀM VUI KHÁCH HÀNG (Family Testimonials)
      ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        {/* Section Header */}
        <div className="flex items-end justify-between">
          <div className="space-y-1.5">
            <span className="text-xs font-bold tracking-wider text-amber-700 uppercase">
              NIỀM VUI KHÁCH HÀNG
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Hình ảnh thực tế & Đánh giá từ gia đình
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/about")}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>Xem tất cả đánh giá</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* 5 Stars */}
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed min-h-[64px] mb-4">
                {t.quote}
              </p>

              {/* Real Photograph */}
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-100">
                <img
                  src={t.image}
                  alt={t.author}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Author & Badge */}
              <div className="flex items-center justify-between pt-2 mt-auto border-t border-slate-100">
                <div className="min-w-0 pr-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">{t.location}</p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 text-slate-600 text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 border border-slate-200">
                  {t.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: URGENT CTA BANNER (Thung Lũng Đà Lạt)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#0e391f] via-[#144a27] to-[#185c31] p-8 sm:p-12 text-white">
        {/* Subtle Decorative Rings */}
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border-[30px] border-white/5 pointer-events-none" />
        <div className="absolute right-10 -bottom-20 h-64 w-64 rounded-full border-[20px] border-white/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left Text */}
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/70 border border-emerald-600/40 px-3 py-1 text-xs font-semibold text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Đợt mở bán vụ mùa giới hạn</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Chỉ còn 8 ô đất trống trong đợt xuống giống tuần này tại thung lũng Đà Lạt
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-xl">
              Đăng ký ngay hôm nay để nhận suất ưu tiên chọn góc quan sát camera tốt nhất và miễn phí 100% công lắp đặt cảm biến thông minh.
            </p>
          </div>

          {/* Right Button */}
          <button
            type="button"
            onClick={() => navigate("/plots")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white px-8 py-4 text-sm sm:text-base font-bold shadow-xl hover:shadow-orange-500/25 transition-all duration-200 active:scale-98 shrink-0 group"
          >
            <span>Đặt ô đất ngay hôm nay</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: VIDEO VƯỜN & CAMERA LIVE FULLSCREEN PREVIEW
      ───────────────────────────────────────────────────────────── */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-white/20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-900/90 border-b border-white/10 text-white">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
                <h3 className="text-sm font-bold">Trực Tiếp Camera Luống RA - 102 (Đà Lạt)</h3>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono">
                  1080P HD
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video / Camera feed representation */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src="/images/greenhouse_camera_live.jpg"
                alt="Camera Live Full View"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 rounded-full bg-black/60 text-white px-3 py-1 font-mono text-xs backdrop-blur-md">
                Thời gian: {liveTime}
              </div>
            </div>

            {/* Footer Status Bar */}
            <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900/90 border-t border-white/10 text-xs text-slate-300 gap-3">
              <div className="flex items-center gap-6">
                <span>🌱 Cây trồng: <strong>Cải bó xôi Nhật</strong></span>
                <span>💧 Độ ẩm đất: <strong>68%</strong></span>
                <span>🌡 Nhiệt độ: <strong>24.2 °C</strong></span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  navigate("/plots");
                }}
                className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 text-xs transition-colors"
              >
                Thuê ô đất này ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
