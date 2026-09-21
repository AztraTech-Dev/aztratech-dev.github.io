/**
 * Decorative hero visual: a layered infrastructure core seen in perspective.
 * Reading order, most to least prominent:
 *
 * 1. core: three offset state plates and two crossing planes on a bright axis
 *    (asset, value, critical state), sandwiched between an under-layer and a
 *    glass lid so it reads as protected
 * 2. state layers: offset, slightly twisted slabs (one asset in several
 *    controlled states; blockchain and integration logic)
 * 3. control shell: angular corner brackets that sway a few degrees
 *    (permissions, boundaries, gated access)
 * 4. rails: an inbound and an outbound path that carry the settlement signal
 * 5. nodes: a few small external endpoints (providers, networks)
 *
 * Pure SVG + CSS, rendered on the server. The SVG defines no ids, gradients or
 * filters, so any number of instances can share a page. The ambient field and
 * core halo are CSS layers on `.infra-core`. Styling and motion live in
 * globals.css under "HOME HERO: AZTRATECH INFRASTRUCTURE CORE"; the base
 * styles are the static composition and motion is opt-in there.
 */

const WIDTH = 600;
const HEIGHT = 440;
const CX = 300;
const CY = 174;
/** Vertical squash of the ground plane. Lower values look more edge-on. */
const K = 0.56;

type Point = readonly [number, number];

const n = (value: number) => Number(value.toFixed(1));
const rad = (deg: number) => (deg * Math.PI) / 180;

/** World position (x right, y toward the viewer, z up) to screen position. */
const screen = (x: number, y: number, z: number): Point => [CX + x, CY + y * K - z];

const polygon = (points: Point[]) =>
  `M${points.map(([x, y]) => `${n(x)} ${n(y)}`).join("L")}Z`;

/** A flat square lying on the ground plane, seen from above at an angle. */
function squareCorners(radius: number, yaw: number) {
  return [0, 1, 2, 3].map((i) => {
    const angle = rad(yaw + 90 * i);
    return [radius * Math.cos(angle), radius * Math.sin(angle)] as const;
  });
}

/**
 * A slab is a top face plus the side faces that point toward the viewer.
 * Side faces are shaded by a fixed light from the upper left, which is where
 * most of the perceived depth comes from.
 */
function buildSlab({ radius, yaw, z, thickness, dx = 0, dy = 0 }: SlabSpec) {
  const corners = squareCorners(radius, yaw).map(([x, y]) => [x + dx, y + dy] as const);
  const top = polygon(corners.map(([x, y]) => screen(x, y, z + thickness)));
  const sides = corners.flatMap(([x1, y1], i) => {
    const [x2, y2] = corners[(i + 1) % 4];
    const normal = yaw + 90 * i + 45;
    if (Math.sin(rad(normal)) <= 0.05) return [];
    const light = 0.5 + 0.5 * Math.cos(rad(normal - 160));
    return [
      {
        d: polygon([
          screen(x1, y1, z + thickness),
          screen(x2, y2, z + thickness),
          screen(x2, y2, z),
          screen(x1, y1, z),
        ]),
        opacity: n(0.3 + 0.5 * light),
      },
    ];
  });
  return { top, sides };
}

type SlabSpec = {
  name: string;
  radius: number;
  yaw: number;
  z: number;
  thickness: number;
  /** Ground-plane offset of the slab centre, for asymmetric stacking. */
  dx?: number;
  dy?: number;
};

/**
 * Bottom to top. The luminous core sits between an under-layer and a glass lid,
 * so it reads as protected. Yaw twists are small and uneven on purpose.
 */
const slabSpecs: SlabSpec[] = [
  { name: "base", radius: 212, yaw: 0, z: -80, thickness: 10 },
  { name: "under", radius: 150, yaw: 14, z: -40, thickness: 8 },
  { name: "core-a", radius: 90, yaw: -8, z: -10, thickness: 10 },
  { name: "core-b", radius: 66, yaw: 12, z: 0, thickness: 8, dx: 10, dy: -6 },
  { name: "core-c", radius: 42, yaw: -6, z: 8, thickness: 8, dx: -6, dy: 5 },
  { name: "lid", radius: 176, yaw: -12, z: 44, thickness: 8 },
];
const slabs = slabSpecs.map((spec) => ({ ...buildSlab(spec), name: spec.name }));
const [baseSlab, underSlab, coreSlabA, coreSlabB, coreSlabC, lidSlab] = slabs;

/** A chamfered vertical plane through the axis, `yaw` degrees around it. */
function verticalPlane(yaw: number, halfWidth: number, zBottom: number, zTop: number) {
  const ch = 14;
  const u = rad(yaw);
  const at = (a: number, z: number) => screen(a * Math.cos(u), a * Math.sin(u), z);
  const w = halfWidth;
  return polygon([
    at(-w + ch, zBottom),
    at(w - ch, zBottom),
    at(w, zBottom + ch),
    at(w, zTop - ch),
    at(w - ch, zTop),
    at(-w + ch, zTop),
    at(-w, zTop - ch),
    at(-w, zBottom + ch),
  ]);
}

const corePlanes = [verticalPlane(112, 104, -60, 76), verticalPlane(22, 104, -60, 76)];

/** The vertical axis: stacked segments of decreasing length fade toward the ends. */
const axis = [
  { top: 118, bottom: 96, opacity: 0.12 },
  { top: 92, bottom: 74, opacity: 0.24 },
  { top: 62, bottom: 46, opacity: 0.55 },
].map(({ top, bottom, opacity }) => ({
  d: `M${CX} ${CY - top}V${CY + bottom}`,
  opacity,
}));

/**
 * Control shell: angular corner brackets around the base of the stack instead of
 * a full ring. Drawn on the ground plane in local coordinates, so a small sway
 * looks like perspective drift.
 */
function bracketPaths(radius: number, yaw: number, fraction: number) {
  const corners = squareCorners(radius, yaw);
  const far: string[] = [];
  const near: string[] = [];
  corners.forEach(([x, y], i) => {
    const [px, py] = corners[(i + 3) % 4];
    const [nx, ny] = corners[(i + 1) % 4];
    const d =
      `M${n(x + (px - x) * fraction)} ${n(y + (py - y) * fraction)}` +
      `L${n(x)} ${n(y)}` +
      `L${n(x + (nx - x) * fraction)} ${n(y + (ny - y) * fraction)}`;
    (y < -1 ? far : near).push(d);
  });
  return { far: far.join(""), near: near.join("") };
}

const SHELL_Z = -98;
const shell = bracketPaths(248, 0, 0.3);

/** Inbound rail enters low on the left, outbound rail leaves high on the right. */
const railIn = `M44 ${CY + 100}H138L206 ${CY + 58}L252 ${CY + 32}`;
const railOut = `M350 ${CY - 30}L398 ${CY - 58}H504`;
const quietRails = [
  `M568 ${CY + 76}H478L410 ${CY + 38}`,
  `M92 ${CY - 112}H160L214 ${CY - 78}`,
];
const nodes: Point[] = [
  [44, CY + 100],
  [504, CY - 58],
  [568, CY + 76],
  [92, CY - 112],
];

function Slab({ slab }: { slab: (typeof slabs)[number] }) {
  return (
    <g className={`infra-core__slab infra-core__slab--${slab.name}`}>
      {slab.sides.map((side) => (
        <path key={side.d} className="infra-core__side" d={side.d} fillOpacity={side.opacity} />
      ))}
      <path className="infra-core__top" d={slab.top} />
    </g>
  );
}

export default function AztraTechInfrastructureCore() {
  return (
    <div className="infra-core" aria-hidden="true">
      <svg className="infra-core__svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        {/* Control shell, far corner. */}
        <g transform={`translate(${CX} ${CY - SHELL_Z}) scale(1 ${K})`}>
          <g className="infra-core__rotor infra-core__sway">
            <path className="infra-core__shell infra-core__shell--far" d={shell.far} />
          </g>
        </g>

        {/* Quiet rails to the outer endpoints. */}
        {quietRails.map((d) => (
          <path key={d} className="infra-core__rail infra-core__rail--quiet" d={d} />
        ))}

        {/* State layers under the core. */}
        <Slab slab={baseSlab} />
        <Slab slab={underSlab} />

        {/* Core: three offset state plates and two crossing planes. */}
        <Slab slab={coreSlabA} />
        <Slab slab={coreSlabB} />
        <Slab slab={coreSlabC} />
        {corePlanes.map((d) => (
          <path key={d} className="infra-core__plane" d={d} />
        ))}

        {/* Glass lid. */}
        <Slab slab={lidSlab} />

        {/* Rails that carry the signal into and out of the core, over the lid. */}
        <path className="infra-core__rail" d={railIn} />
        <path className="infra-core__rail" d={railOut} />

        {/* The axis piercing everything. */}
        {axis.map((segment) => (
          <path
            key={segment.d}
            className="infra-core__axis"
            d={segment.d}
            strokeOpacity={segment.opacity}
          />
        ))}

        {/* Settlement signals: inbound, then outbound. */}
        <path className="infra-core__signal infra-core__signal--in" d={railIn} pathLength="100" />
        <path className="infra-core__signal infra-core__signal--out" d={railOut} pathLength="100" />

        {/* Control shell, near corners. */}
        <g transform={`translate(${CX} ${CY - SHELL_Z}) scale(1 ${K})`}>
          <g className="infra-core__rotor infra-core__sway">
            <path className="infra-core__shell" d={shell.near} />
          </g>
        </g>

        {/* External endpoints. */}
        {nodes.map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <circle className="infra-core__node-ring" r="6.5" />
            <circle className="infra-core__node-dot" r="2.6" />
          </g>
        ))}
      </svg>
    </div>
  );
}
