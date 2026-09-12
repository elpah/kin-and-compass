export type VisitCategory = {
  id: string;
  label: string;
  line: string;
  images: string[];
};

const cld = (path: string) =>
  `https://res.cloudinary.com/dvwpuenzk/image/upload/${path}`;

export const visitCategories: VisitCategory[] = [
  {
    id: "naming",
    label: "Naming ceremony",
    line: "Outdooring, kente, and the names a family speaks into a child.",
    images: [
      cld("v1789170150/naming_cover_dlpzi5.webp"),
      cld("v1789170151/naming1_mtcqxf.webp"),
    ],
  },
  {
    id: "food",
    label: "Food",
    line: "Jollof, banku, waakye, and the night markets that feed Accra.",
    images: [
      cld("v1789170068/food_cover_gdfxsc.webp"),
      cld("v1789170063/food1_ujtvny.webp"),
      cld("v1789170067/food2_qj3mlb.webp"),
      cld("v1789170068/food3_wotnmi.webp"),
      cld("v1789170064/food4_r2vmv1.webp"),
    ],
  },
  {
    id: "nightlife",
    label: "Nightlife",
    line: "Highlife, hiplife, and rooms that do not empty until the sun is up.",
    images: [
      cld("v1789170160/night_cover_qbmvdb.webp"),
      cld("v1789170163/night1_ffzltz.webp"),
      cld("v1789170154/night2_skqj1f.webp"),
      cld("v1789170154/night3_cioawj.webp"),
      cld("v1789170158/night4_q7dxzr.webp"),
      cld("v1789170159/night5_meyzi3.webp"),
      cld("v1789170161/night6_e5ozb0.webp"),
      cld("v1789170163/night7_dtnoop.webp"),
      cld("v1789170157/night8_zijbsr.webp"),
    ],
  },
  {
    id: "tour",
    label: "Tour",
    line: "Nature, beach, and bus - canopy, coast, and the road between them.",
    images: [
      cld("v1789170173/tourist_cover_zjfgpc.webp"),
      cld("v1789170165/tourist1_vvm5mm.webp"),
      cld("v1789170171/tourist2_rmknft.webp"),
      cld("v1789170170/tourist3_tgiylz.webp"),
      cld("v1789170175/tourist4_a7daur.webp"),
      cld("v1789170172/tourist5_xwkm6s.webp"),
      cld("v1789170168/tourist6_itlzk3.webp"),
      cld("v1789170165/tourist7_ycomer.webp"),
      cld("v1789170175/tourist8_adeiov.webp"),
      cld("v1789170169/tourist11_fhhtpj.webp"),
    ],
  },
  {
    id: "experience",
    label: "Experience",
    line: "Kente, weaving, tie-dye, clay, and the kitchen - skills you take home in your hands.",
    images: [
      cld("v1789170054/experience_kente_unenj2.webp"),
      cld("v1789170049/experience_kente2_m4kria.webp"),
      cld("v1789170055/experience_weave_gwuavx.webp"),
      cld("v1789170051/experience_weave3_eawuaq.webp"),
      cld("v1789170053/experience_tie_dye1_wbebn7.webp"),
      cld("v1789170048/experience_tie_dye2_ugsf40.webp"),
      cld("v1789170050/experience_tie_dye3_aoo64n.webp"),
      cld("v1789170046/experience_ceramic1_daf2jn.webp"),
      cld("v1789170052/experience_cooking1_vih2db.webp"),
      cld("v1789170046/experience_cooking2_lbrggk.webp"),
    ],
  },
  {
    id: "ancestors",
    label: "Heritage",
    line: "Walk the door of no return with a guide who will not rush you.",
    images: [
      cld("v1789170044/connect_to_ancestors_cover_xvpmy2.webp"),
      cld("v1789170043/connect_to_ancestors1_mtihyo.webp"),
      cld("v1789170044/connect_to_ancestors2_snjiv9.webp"),
    ],
  },
  {
    id: "games",
    label: "Games",
    line: "Oware in the courtyard, and football that stops a whole street.",
    images: [
      cld("v1789170147/games_cover_xkehke.webp"),
      cld("v1789170139/games1_iowv5x.webp"),
      cld("v1789170148/games2_fuqwiv.webp"),
    ],
  },
  {
    id: "festivals",
    label: "Festivals",
    line: "Homowo, Aboakyer, chieftaincy, and the calendar that still runs the year.",
    images: [
      cld("v1789170056/festival_cover_e6a7ku.webp"),
      cld("v1789170062/festival1_frrnfm.webp"),
      cld("v1789170056/festival2_cf2g4c.webp"),
      cld("v1789170059/festival3_am3ptl.webp"),
      cld("v1789170059/festival4_cursac.webp"),
      cld("v1789170060/festival5_f0yzwl.webp"),
      cld("v1789170061/festival6_zlo3b0.webp"),
    ],
  },
];
