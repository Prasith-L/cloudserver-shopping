import { useEffect } from 'react'
import { MainLayout } from './layouts/MainLayout'
import { useDeploymentStore } from './store/useDeploymentStore'
import { SKUCard } from './components/ui/SKUCard'
import { SKUCardSkeleton, AddonSkeleton } from './components/ui/Skeleton'
import { Cpu, Server, HardDrive, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './components/ui/button'

function App() {
  const {
    data,
    isLoading,
    error,
    fetchData,
    selectedType,
    setSelectedType,
    selectedSKU,
    setSelectedSKU,
    extraRam,
    setExtraRam,
    extraDisk,
    setExtraDisk,
    billingCycle
  } = useDeploymentStore();


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-8 border border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
          <AlertCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">{error}</h2>
        <p className="text-neutral-500 mb-10 max-w-md leading-relaxed">ระบบไม่สามารถดึงข้อมูลเซิร์ฟเวอร์ได้ในขณะนี้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณหรือลองใหม่อีกครั้ง</p>
        <Button
          onClick={() => fetchData()}
          className="flex items-center gap-3 px-10 py-8 text-xl font-bold bg-white text-black hover:bg-neutral-200 rounded-2xl transition-all active:scale-95 shadow-2xl"
        >
          <RefreshCw size={24} className={isLoading ? 'animate-spin' : ''} />
          {isLoading ? 'Loading...' : 'ลองใหม่อีกครั้ง'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-16 text-lg">
      {/* Type of Server Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight text-white">Type of Server</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Virtual Machine Option */}
          <button
            onClick={() => setSelectedType('virtual-machine')}
            className={`group relative p-8 rounded-3xl border transition-all duration-300 text-left ${selectedType === 'virtual-machine'
              ? 'bg-indigo-600/10 border-indigo-500 shadow-2xl shadow-indigo-500/10'
              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
              }`}
          >
            <div className="flex items-start justify-between mb-10">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${selectedType === 'virtual-machine' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 scale-110' : 'bg-neutral-800 text-neutral-400 group-hover:text-neutral-200'
                }`}>
                <Cpu size={32} />
              </div>
              {selectedType === 'virtual-machine' && (
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-white transition-transform animate-pulse" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Virtual Machines</h3>
              <p className="text-neutral-400 text-base leading-relaxed">
                Scalable compute resources with shared or dedicated vCPUs. Perfect for web apps and scaling.
              </p>
            </div>
          </button>

          {/* Dedicated Server Option */}
          <button
            onClick={() => setSelectedType('dedicated')}
            className={`group relative p-8 rounded-3xl border transition-all duration-300 text-left ${selectedType === 'dedicated'
              ? 'bg-indigo-600/10 border-indigo-500 shadow-2xl shadow-indigo-500/10'
              : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
              }`}
          >
            <div className="flex items-start justify-between mb-10">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${selectedType === 'dedicated' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 scale-110' : 'bg-neutral-800 text-neutral-400 group-hover:text-neutral-200'
                }`}>
                <Server size={32} />
              </div>
              {selectedType === 'dedicated' && (
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-white transition-transform animate-pulse" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-white">Dedicated Servers</h3>
              <p className="text-neutral-400 text-base leading-relaxed">
                Bare metal performance with exclusive access to hardware. Ideal for high-performance workloads.
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* SKUs Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white">Available SKUs</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-neutral-500 bg-neutral-900 px-4 py-1.5 rounded-full border border-neutral-800 tracking-wider uppercase">
              {selectedType === 'virtual-machine' ? 'Cloud' : 'Metal'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? [...Array(6)].map((_, i) => <SKUCardSkeleton key={i} />)
            : data?.skus
              .filter((sku) => sku.type === selectedType)
              .map((sku) => (
                <SKUCard
                  key={sku.name}
                  sku={sku}
                  isSelected={selectedSKU?.name === sku.name}
                  onSelect={setSelectedSKU}
                  billingCycle={billingCycle}
                />
              ))}
        </div>
      </section>
      {/* Add-ons Section */}
      <section className="space-y-8 pb-12">
        <h2 className="text-3xl font-bold tracking-tight text-white">Custom Add-ons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading ? (
            <>
              <AddonSkeleton />
              <AddonSkeleton />
            </>
          ) : (
            <>
              {/* RAM Add-on */}
              <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 space-y-6 hover:border-neutral-700 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Extra RAM</h3>
                      <p className="text-sm text-neutral-500">Boost memory performance</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-400">
                      +฿{data?.addons.find(a => a.type === 'ram')?.price_per_unit_monthly || 0}
                    </span>
                    <span className="text-[10px] text-neutral-600 block uppercase font-bold tracking-tighter">per GB/mo</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="1024"
                    value={extraRam}
                    onChange={(e) => setExtraRam(Math.max(0, parseInt(e.target.value) || 0))}
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-3 text-xl font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/50 transition-all"
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setExtraRam(extraRam + 1)}
                      className="p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                    >
                      <span className="block text-xs">▲</span>
                    </button>
                    <button
                      onClick={() => setExtraRam(Math.max(0, extraRam - 1))}
                      className="p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                    >
                      <span className="block text-xs">▼</span>
                    </button>
                  </div>
                  <span className="text-neutral-500 font-bold tracking-widest text-sm uppercase">GB</span>
                </div>
              </div>

              {/* Storage Add-on */}
              <div className="p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 space-y-6 hover:border-neutral-700 transition-colors group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                      <HardDrive size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Extra Storage</h3>
                      <p className="text-sm text-neutral-500">NVMe SSD capacity</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-400">
                      +฿{data?.addons.find(a => a.type === 'disk')?.price_per_unit_monthly || 0}
                    </span>
                    <span className="text-[10px] text-neutral-600 block uppercase font-bold tracking-tighter">per GB/mo</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    value={extraDisk}
                    onChange={(e) => setExtraDisk(Math.max(0, parseInt(e.target.value) || 0))}
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-3 text-xl font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all"
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => setExtraDisk(extraDisk + 1)}
                      className="p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                    >
                      <span className="block text-xs">▲</span>
                    </button>
                    <button
                      onClick={() => setExtraDisk(Math.max(0, extraDisk - 1))}
                      className="p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                    >
                      <span className="block text-xs">▼</span>
                    </button>
                  </div>
                  <span className="text-neutral-500 font-bold tracking-widest text-sm uppercase">GB</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default function Root() {
  return (
    <MainLayout>
      <App />
    </MainLayout>
  )
}
