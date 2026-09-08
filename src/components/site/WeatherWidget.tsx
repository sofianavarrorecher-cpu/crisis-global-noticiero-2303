import { useEffect, useState } from "react";
import { CloudSun, MapPin } from "lucide-react";
import { SectionTitle } from "@/components/site/Sidebar";

type Weather = {
  temp: number;
  feels: number;
  code: number;
  wind: number;
  humidity: number;
  max: number;
  min: number;
  place: string;
  time: string;
};

const WMO: Record<number, string> = {
  0: "Despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  48: "Niebla con escarcha",
  51: "Llovizna ligera",
  53: "Llovizna",
  55: "Llovizna intensa",
  61: "Lluvia ligera",
  63: "Lluvia",
  65: "Lluvia intensa",
  66: "Lluvia helada",
  67: "Lluvia helada intensa",
  71: "Nieve ligera",
  73: "Nieve",
  75: "Nieve intensa",
  77: "Granizo fino",
  80: "Chaparrones",
  81: "Chaparrones fuertes",
  82: "Chaparrones violentos",
  85: "Nevadas",
  86: "Nevadas intensas",
  95: "Tormenta",
  96: "Tormenta con granizo",
  99: "Tormenta fuerte con granizo",
};

type Status = "idle" | "locating" | "loading" | "ready" | "denied" | "error";

export function WeatherWidget({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [w, setW] = useState<Weather | null>(null);

  async function load(lat: number, lon: number) {
    setStatus("loading");
    try {
      const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m` +
        `&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;
      const [meteo, geo] = await Promise.all([
        fetch(url).then((r) => r.json()),
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=10&accept-language=es`,
        )
          .then((r) => r.json())
          .catch(() => null),
      ]);
      const a = geo?.address ?? {};
      const place =
        a.city || a.town || a.village || a.municipality || a.county || a.state || "Tu ubicación";
      setW({
        temp: Math.round(meteo.current.temperature_2m),
        feels: Math.round(meteo.current.apparent_temperature),
        code: meteo.current.weather_code,
        wind: Math.round(meteo.current.wind_speed_10m),
        humidity: meteo.current.relative_humidity_2m,
        max: Math.round(meteo.daily.temperature_2m_max[0]),
        min: Math.round(meteo.daily.temperature_2m_min[0]),
        place,
        time: meteo.current.time,
      });
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  function locate() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("error");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => load(pos.coords.latitude, pos.coords.longitude),
      () => setStatus("denied"),
      { timeout: 10_000, maximumAge: 600_000 },
    );
  }

  useEffect(() => {
    // Si el usuario ya autorizó la ubicación, cargamos sin pedir nada.
    if (typeof navigator === "undefined") return;
    navigator.permissions
      ?.query({ name: "geolocation" })
      .then((p) => {
        if (p.state === "granted") locate();
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    const id = setInterval(locate, 30 * 60 * 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const body = (() => {
    if (status === "ready" && w) {
      return (
        <div>
          <p className="font-ui flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="size-3" /> {w.place}
          </p>
          <div className="mt-1 flex items-end gap-3">
            <span className="font-headline text-5xl leading-none font-bold">{w.temp}°</span>
            <div className="font-ui pb-1 text-xs">
              <p className="font-semibold">{WMO[w.code] ?? "Condiciones variables"}</p>
              <p className="text-muted-foreground">
                Máx {w.max}° · Mín {w.min}°
              </p>
            </div>
          </div>
          {!compact && (
            <p className="font-ui mt-2 text-[11px] text-muted-foreground">
              Sensación {w.feels}° · Humedad {w.humidity}% · Viento {w.wind} km/h
            </p>
          )}
          <p className="font-ui mt-1 text-[10px] text-muted-foreground">
            Datos: Open-Meteo · se actualiza cada 30 min
          </p>
        </div>
      );
    }
    if (status === "locating" || status === "loading") {
      return <p className="font-ui text-xs text-muted-foreground">Obteniendo el clima de tu ubicación…</p>;
    }
    if (status === "denied") {
      return (
        <p className="font-ui text-xs text-muted-foreground">
          No pudimos acceder a tu ubicación. Habilitá el permiso en el navegador y volvé a intentar.
        </p>
      );
    }
    if (status === "error") {
      return <p className="font-ui text-xs text-muted-foreground">El servicio de clima no respondió. Probá de nuevo.</p>;
    }
    return (
      <p className="font-ui text-xs text-muted-foreground">
        Temperatura y condiciones actuales según la ubicación de tu dispositivo.
      </p>
    );
  })();

  return (
    <section>
      <SectionTitle>El clima hoy</SectionTitle>
      <div className="border border-border bg-surface p-4">
        {body}
        {status !== "ready" && status !== "locating" && status !== "loading" && (
          <button
            type="button"
            onClick={locate}
            className="font-ui mt-3 inline-flex items-center gap-1.5 bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
          >
            <CloudSun className="size-4" /> Ver el clima en mi ubicación
          </button>
        )}
      </div>
    </section>
  );
}
