import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Link } from "react-router-dom";
import { ArrowLeft, Shovel, Sprout, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type TreeType = "apple_tree" | "pine_tree" | "palm" | "golden_tree";
const TREE_TYPES: TreeType[] = ["apple_tree", "pine_tree", "palm", "golden_tree"];
const TREE_EMOJI: Record<TreeType, string> = {
  apple_tree: "🍎",
  pine_tree: "🌲",
  palm: "🌴",
  golden_tree: "✨",
};

const DIG_TARGET = 5;

type Phase = "digging" | "ready" | "growing" | "celebrate";

const TreeGamePage = () => {
  const { t } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);

  const [totalTrees, setTotalTrees] = useLocalStorage("ecokids:tree:totalTrees", 0);
  const [gardenTypes, setGardenTypes] = useLocalStorage<TreeType[]>("ecokids:tree:garden", []);

  const [phase, setPhase] = useState<Phase>("digging");
  const [digProgress, setDigProgress] = useState(0);
  const [treeType, setTreeType] = useState<TreeType>(() => TREE_TYPES[Math.floor(Math.random() * TREE_TYPES.length)]);
  const [message, setMessage] = useState(t("tree.welcome"));
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState(false);

  const digMessages = [t("tree.dig1"), t("tree.dig2"), t("tree.dig3"), t("tree.dig4")];
  const facts = [t("tree.fact1"), t("tree.fact2"), t("tree.fact3"), t("tree.fact4")];

  const handleDig = () => {
    if (phase !== "digging") return;
    const next = digProgress + 1;
    setDigProgress(next);
    if (next % 2 === 0) {
      setMessage(facts[(next / 2 - 1) % facts.length]);
    } else {
      setMessage(digMessages[Math.min(next - 1, digMessages.length - 1)]);
    }
    if (next >= DIG_TARGET) {
      setPhase("ready");
      setMessage(t("tree.readyToPlant"));
    }
  };

  const handlePlant = () => {
    setPhase("growing");
  };

  const handlePlantAnother = () => {
    setTreeType(TREE_TYPES[Math.floor(Math.random() * TREE_TYPES.length)]);
    setDigProgress(0);
    setPhase("digging");
    setModelError(false);
    setMessage(t("tree.welcome"));
  };

  // Uch o'lchamli sahnani sozlash - o'sish bosqichida ishga tushadi.
  // MUHIM: bu versiya barcha geometriya/material/teksturalarni tozalaydi
  // (avvalgi versiyada bu yo'q edi va vaqt o'tishi bilan GPU xotirasi
  // sizib chiqishi mumkin edi), shuningdek yuklanish holati va xato
  // (onError) uchun signal beradi.
  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode || phase !== "growing") return;

    let disposed = false;
    let animationId = 0;
    const width = mountNode.clientWidth || 320;
    const height = mountNode.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.2, 6);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.innerHTML = "";
    mountNode.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const loader = new GLTFLoader();
    let modelRoot: THREE.Object3D | null = null;
    let growScale = 0.01;
    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];
    const disposableTextures: THREE.Texture[] = [];

    setModelLoading(true);
    setModelError(false);

    loader.load(
      `/models/${treeType}/scene.gltf`,
      (gltf) => {
        if (disposed) return;
        modelRoot = gltf.scene;
        modelRoot.scale.set(growScale, growScale, growScale);
        modelRoot.position.set(0, 0, 0);
        scene.add(modelRoot);

        modelRoot.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) disposableGeometries.push(child.geometry);
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach((mat: THREE.Material) => {
              disposableMaterials.push(mat);
              Object.values(mat as unknown as Record<string, unknown>).forEach((v) => {
                if (v instanceof THREE.Texture) disposableTextures.push(v);
              });
            });
          }
        });
        setModelLoading(false);
      },
      undefined,
      () => {
        if (disposed) return;
        setModelLoading(false);
        setModelError(true);
      }
    );

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (modelRoot) {
        if (growScale < 1) {
          growScale = Math.min(1, growScale + 0.015);
          modelRoot.scale.set(growScale, growScale, growScale);
        }
        modelRoot.rotation.y += 0.006;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Bir necha soniyadan keyin "tabriklaymiz" bosqichiga o'tamiz
    const celebrateTimer = setTimeout(() => {
      setPhase("celebrate");
      setTotalTrees((prev) => prev + 1);
      setGardenTypes((prev) => [...prev, treeType]);
    }, 3200);

    return () => {
      disposed = true;
      clearTimeout(celebrateTimer);
      cancelAnimationFrame(animationId);
      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
      disposableTextures.forEach((tex) => tex.dispose());
      renderer.dispose();
      mountNode.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, treeType]);

  const digPercent = (Math.min(digProgress, DIG_TARGET) / DIG_TARGET) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="eco-container py-6 md:py-10">
        <Link to="/games" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> {t("tree.back")}
        </Link>

        {/* Tulki maskot va xabar */}
        <div className="flex items-start gap-3 max-w-xl mx-auto mb-6 bg-card border border-border rounded-2xl p-4 shadow-sm">
          <span className="text-4xl flex-shrink-0">🦊</span>
          <div>
            <p className="text-xs font-bold text-primary mb-0.5">{t("tree.foxName")}</p>
            <p className="text-sm text-foreground">{message}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {/* Interaktiv qism */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl text-center">
            {phase === "growing" || phase === "celebrate" ? (
              <div className="relative">
                <div ref={mountRef} className="w-full aspect-square rounded-2xl bg-gradient-to-b from-sky/20 to-primary/10 overflow-hidden" />
                {modelLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-card/70 rounded-2xl">
                    <p className="text-sm font-semibold text-muted-foreground animate-pulse-soft">{t("tree.modelLoading")}</p>
                  </div>
                )}
                {modelError && !modelLoading && (
                  <div className="absolute inset-x-2 bottom-2 bg-card/95 border border-border rounded-xl p-2 text-xs text-muted-foreground">
                    {t("tree.modelError")}
                  </div>
                )}
                {phase === "celebrate" && (
                  <div className="mt-6">
                    <PartyPopper className="w-10 h-10 text-accent mx-auto mb-2" />
                    <h2 className="font-display text-xl font-bold mb-1">{t("tree.congratsTitle")}</h2>
                    <p className="text-muted-foreground text-sm mb-1">{t("tree.congratsSubtitle")}</p>
                    <p className="text-accent font-bold mb-4">{t("tree.xp")}</p>
                    <Button onClick={handlePlantAnother}>
                      <Sprout className="w-4 h-4" /> {t("tree.plantBtn")}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <span className="text-8xl mb-6 inline-block">{phase === "ready" ? "🕳️" : "⛏️"}</span>
                <div className="w-full h-3 bg-muted rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${digPercent}%` }} />
                </div>
                {phase === "digging" ? (
                  <Button size="xl" variant="hero" onClick={handleDig} className="w-full">
                    <Shovel className="w-5 h-5" /> {t("tree.digBtn")}
                  </Button>
                ) : (
                  <Button size="xl" variant="accent" onClick={handlePlant} className="w-full">
                    <Sprout className="w-5 h-5" /> {t("tree.plantBtn")}
                  </Button>
                )}
                <p className="text-xs text-muted-foreground mt-3">
                  {phase === "ready" ? t("tree.readyToPlant") : t("tree.needDigging")}
                </p>
              </>
            )}
          </div>

          {/* Bog' */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl">
            <h2 className="font-display text-lg font-bold mb-1">{t("tree.gardenTitle")}</h2>
            <p className="text-3xl font-black text-primary mb-4">
              {totalTrees} <span className="text-base font-semibold text-muted-foreground">{t("tree.treesCountSuffix")}</span>
            </p>
            {gardenTypes.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("tree.noTreesYet")}</p>
            ) : (
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                {gardenTypes.map((type, idx) => (
                  <span key={idx} className="text-2xl" title={type}>
                    {TREE_EMOJI[type]}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeGamePage;
