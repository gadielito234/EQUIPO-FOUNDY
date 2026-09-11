import { useState } from 'react';
import { jsPDF } from 'jspdf';

const monthlyData = [];

function Statistics() {
  const [mesSeleccionado, setMesSeleccionado] = useState(5); // JUN por defecto
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState('6 MONTHS');

  if (monthlyData.length === 0) {
    return <div className="rounded-lg border border-dashed border-[#cbd4d3] p-8 text-center text-sm text-[#446062]">No statistics available.</div>;
  }

  const getDatosPorPeriodo = (periodo) => {
    switch (periodo) {
      case '6 MONTHS':
        return monthlyData.slice(1);
      case '1 YEAR':
        return monthlyData;
      case 'ALL':
        return monthlyData;
      default:
        return monthlyData;
    }
  };

  const datosPorPeriodo = getDatosPorPeriodo(periodoSeleccionado);
  const mesVisibleIndex = Math.min(mesSeleccionado, datosPorPeriodo.length - 1);
  const datosActivos = datosPorPeriodo[mesVisibleIndex];

  const handlePeriodoChange = (periodo) => {
    setPeriodoSeleccionado(periodo);

    const nuevoRango = getDatosPorPeriodo(periodo);
    const ultimoMes = nuevoRango.length - 1;
    const mesActual = monthlyData.findIndex((mes) => mes.month === nuevoRango[ultimoMes].month);
    setMesSeleccionado(mesActual >= 0 ? mesActual : 0);
  };

  const handleExportReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    doc.setFillColor(244, 246, 247);
    doc.rect(0, 0, pageWidth, 300, 'F');

    doc.setTextColor(0, 76, 82);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('My Statistics', 14, 22);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(104, 117, 119);
    doc.setFontSize(10);
    doc.text('Track your progress and get insights into your performance.', 14, 30);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(20, 111, 120);
    doc.roundedRect(14, 42, 58, 30, 4, 4, 'F');
    doc.setFontSize(10);
    doc.text('Total Investment', 20, 53);
    doc.setFontSize(18);
    doc.text(datosActivos.totalInvestment, 20, 66);

    doc.setFillColor(255, 255, 255);
    doc.setTextColor(39, 76, 82);
    doc.roundedRect(84, 42, 58, 30, 4, 4, 'F');
    doc.setFontSize(10);
    doc.text('Avg. Annual ROI', 90, 53);
    doc.setFontSize(18);
    doc.text(datosActivos.roi, 90, 66);

    doc.setFillColor(228, 243, 239);
    doc.roundedRect(154, 42, 58, 30, 4, 4, 'F');
    doc.setTextColor(50, 151, 125);
    doc.setFontSize(10);
    doc.text('Active Projects', 160, 53);
    doc.setFontSize(18);
    doc.text(datosActivos.activeProjects, 170, 66);

    doc.setTextColor(0, 76, 82);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Portfolio Growth', 14, 96);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Your investment growth over time', 14, 102);
    doc.text(`Selected month: ${monthlyData[mesSeleccionado].month}`, 14, 110);

    doc.setFillColor(21, 126, 129);
    doc.setDrawColor(21, 126, 129);
    doc.line(14, 118, 192, 118);
    doc.text('Growth trend', 14, 130);
    doc.text(`Investment change: ${datosActivos.investmentChange}`, 14, 138);
    doc.text(`ROI change: ${datosActivos.roiChange}`, 14, 146);
    doc.text(`Projects change: ${datosActivos.projectsChange}`, 14, 154);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('Distribution', 14, 176);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('By project category', 14, 182);

    let yOffset = 192;
    datosActivos.distribution.forEach((item) => {
      doc.setFillColor(...hexToRgb(item.color));
      doc.roundedRect(14, yOffset, 78, 8, 2, 2, 'F');
      doc.setTextColor(0, 76, 82);
      doc.setFontSize(9);
      doc.text(item.label, 22, yOffset + 6);
      doc.text(`${item.pct}%`, 178, yOffset + 6);
      yOffset += 12;
    });

    doc.setTextColor(0, 76, 82);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Foundy · Generated report', centerX, 280, { align: 'center' });

    doc.save('foundy-statistics-report.pdf');
  };

  const hexToRgb = (hex) => {
    const cleanHex = hex.replace('#', '');
    const bigint = Number.parseInt(cleanHex, 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  // Build the donut conic gradient dynamically for the active month.
  const [d1, d2, d3] = datosActivos.distribution;
  const conicGradient = `conic-gradient(${d1.color} 0 ${d1.pct}%, ${d2.color} ${d1.pct}% ${d1.pct + d2.pct}%, ${d3.color} ${d1.pct + d2.pct}% 100%)`;

  return (
    <div className="min-h-screen bg-[#f4f6f7] text-[#31474a]">
      <main id="dashboard" className="mx-auto max-w-6xl px-1 py-1 sm:px-2 lg:px-4">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div><h1 className="text-2xl font-bold tracking-tight text-[#004e56]">My Statistics</h1><p className="mt-1 max-w-lg text-xs leading-5 text-[#687577]">Track your progress and get insights into your performance.</p></div>
              <div className="flex items-center gap-2 self-start"><button type="button" onClick={handleExportReport} className="rounded-md bg-[#006b73] px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#005c61]">Export report</button></div>
            </section>

            <section id="estadisticas" className="mt-7 grid gap-4 sm:grid-cols-3">
              <article className="rounded-lg border border-[#146f78] bg-gray p-4 text-white shadow-[0_8px_18px_rgba(0,90,95,0.12)]">
                <p className="text-[11px] text-[#d8f2ee]">Total Investment</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{datosActivos.totalInvestment}</p>
                <p className="mt-2 text-[10px] font-semibold text-[#c0e9df]">{datosActivos.investmentChange}</p>
              </article>
              <article className="rounded-lg border border-[#e8eeee] bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                <p className="text-[11px] text-[#7d898b]">Avg. Annual ROI</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-[#279578]">{datosActivos.roi}</p>
                <p className="mt-2 text-[10px] font-semibold text-[#2c8068]">{datosActivos.roiChange}</p>
              </article>
              <article className="rounded-lg border border-[#d9eee8] bg-[#e4f3ef] p-4">
                <p className="text-[11px] text-[#527573]">Active Projects</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-[#32977d]">{datosActivos.activeProjects}</p>
                <p className="mt-2 text-[10px] font-semibold text-[#2c8068]">{datosActivos.projectsChange}</p>
              </article>
            </section>

            <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(220px,0.8fr)]">
              <article className="rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                <div className="flex items-start justify-between">
                  <div><h2 className="text-sm font-semibold text-[#293a3d]">Portfolio Growth</h2><p className="mt-1 text-[10px] text-[#899395]">Your investment growth over time</p></div>
                  <div className="flex gap-1 rounded border border-[#e0e7e7] p-1 text-[8px] text-[#617173]">
                    {['6 MONTHS', '1 YEAR', 'ALL'].map((periodo) => (
                      <button
                        key={periodo}
                        type="button"
                        onClick={() => handlePeriodoChange(periodo)}
                        className={periodoSeleccionado === periodo ? 'rounded bg-[#e6f1f0] px-2 py-1 font-semibold text-[#006b73]' : 'px-2 py-1'}
                      >
                        {periodo}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative mt-8 h-40 border-b border-[#e4e9e9] bg-[linear-gradient(to_bottom,transparent_24%,#edf2f2_25%,transparent_26%,transparent_49%,#edf2f2_50%,transparent_51%,transparent_74%,#edf2f2_75%,transparent_76%)]">
                  <svg viewBox="0 0 396 140" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" role="img" aria-label="Portfolio growth during the year">
                    <path d={(() => {
                      const puntos = datosPorPeriodo.map((punto) => ({
                        x: punto.cx,
                        y: punto.cy,
                      }));

                      if (!puntos.length) return '';

                      const path = puntos.map((punto, index) => `${index === 0 ? 'M' : 'L'} ${punto.x} ${punto.y}`).join(' ');
                      return `${path} L 396 140 L 0 140 Z`;
                    })()} fill="url(#growthFill)" />
                    <path d={(() => {
                      const puntos = datosPorPeriodo.map((punto) => ({
                        x: punto.cx,
                        y: punto.cy,
                      }));

                      if (!puntos.length) return '';

                      return puntos.map((punto, index) => `${index === 0 ? 'M' : 'L'} ${punto.x} ${punto.y}`).join(' ');
                    })()} fill="none" stroke="#138b88" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <defs><linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#65bcb2" stopOpacity="0.27" /><stop offset="100%" stopColor="#65bcb2" stopOpacity="0.02" /></linearGradient></defs>

                    {datosPorPeriodo.map((punto) => {
                      const indiceEnMonthlyData = monthlyData.findIndex((mes) => mes.month === punto.month);
                      return (
                        <circle
                          key={punto.month}
                          cx={punto.cx}
                          cy={punto.cy}
                          r={indiceEnMonthlyData === mesSeleccionado ? 5 : 3.5}
                          fill={indiceEnMonthlyData === mesSeleccionado ? '#fff' : '#138b88'}
                          stroke="#138b88"
                          strokeWidth="2"
                          vectorEffect="non-scaling-stroke"
                          onClick={() => setMesSeleccionado(indiceEnMonthlyData)}
                          className="cursor-pointer transition-all"
                          role="button"
                          aria-label={`View statistics for ${punto.month}`}
                        />
                      );
                    })}
                  </svg>
                </div>
                <div className="mt-2 flex justify-between px-1 text-[9px] text-[#899395]">
                  {datosPorPeriodo.map((punto) => {
                    const indiceEnMonthlyData = monthlyData.findIndex((mes) => mes.month === punto.month);
                    return (
                      <button
                        key={punto.month}
                        type="button"
                        onClick={() => setMesSeleccionado(indiceEnMonthlyData)}
                        className={indiceEnMonthlyData === mesSeleccionado ? 'font-semibold text-[#006b73]' : 'hover:text-[#527573]'}
                      >
                        {punto.month}
                      </button>
                    );
                  })}
                </div>
              </article>

              <article className="rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                <h2 className="text-sm font-semibold text-[#293a3d]">Distribution</h2>
                <p className="mt-1 text-[10px] text-[#899395]">By project category</p>
                <div className="mx-auto mt-6 flex h-32 w-32 items-center justify-center rounded-full" style={{ background: conicGradient }}>
                  <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                    <strong className="block text-2xl text-[#006b73]">{datosActivos.activeProjects}</strong>
                    <span className="text-[9px] text-[#7b888a]">ACTIVE PROJECTS</span>
                  </div>
                </div>
                <div className="mt-5 space-y-2 text-[10px] text-[#586668]">
                  {datosActivos.distribution.map((item) => (
                    <p key={item.label}>
                      <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.label}
                      <span className="float-right rounded bg-[#e5f1ee] px-1 text-[#527573]">{item.pct}%</span>
                    </p>
                  ))}
                </div>
              </article>
            </section>

            <section id="proyectos" className="mt-5 rounded-lg border border-[#e8eeee] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"><div className="flex items-start justify-between"><div><h2 className="text-sm font-semibold text-[#293a3d]">Recent Activity</h2><p className="mt-1 text-[10px] text-[#899395]">Your latest investment activity</p></div><button type="button" className="text-[10px] font-semibold text-[#006b73]">View full history</button></div><div className="mt-4 grid gap-3 text-xs sm:grid-cols-3"><p className="border-l-2 border-[#78c7b2] pl-3"><strong className="block text-[#42575a]">New investment added</strong><span className="text-[10px] text-[#899395]">GreenTech Solutions · 2 hours ago</span></p><p className="border-l-2 border-[#78c7b2] pl-3"><strong className="block text-[#42575a]">Project milestone reached</strong><span className="text-[10px] text-[#899395]">EcoMarket · Yesterday</span></p><p className="border-l-2 border-[#78c7b2] pl-3"><strong className="block text-[#42575a]">Monthly report ready</strong><span className="text-[10px] text-[#899395]">Your portfolio · 2 days ago</span></p></div></section>
      </main>
    </div>
  );
}

export default Statistics;
