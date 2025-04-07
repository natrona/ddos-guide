<script>
const terminal = document.getElementById("terminal");
    const linkFinal = document.getElementById("linkFinal");
    const simulateBtn = document.getElementById("simulateBtn");
    const progress = document.getElementById("progress");
    let interval = null;

    function addTerminalLine(text, type = 'info') {
      const line = document.createElement('div');
      line.textContent = text;
      line.className = `log-${type}`;
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
    }

    function simular() {
      if (interval) clearInterval(interval);
      terminal.innerHTML = '';
      linkFinal.textContent = '';
      progress.style.width = '0%';
      
      const url = document.getElementById("target").value.trim();
      if (!url || !/^https?:\/\//i.test(url)) {
        addTerminalLine('Erro: URL inválida. Use http:// ou https://', 'error');
        return;
      }

      simulateBtn.classList.add('loading');
      const MAX_REQUESTS = 100;
      let count = 0;

      addTerminalLine('[!] AVISO: Esta é uma simulação educacional. Nenhum ataque real está sendo realizado.', 'warning');

      const steps = [
        "Carregando módulo DDoS...",
        "Resolvendo endereço do alvo...",
        `Alvo configurado: ${url}`,
        "Gerando IPs aleatórios...",
        "Iniciando inundação de pacotes..."
      ];

      interval = setInterval(() => {
        if (count < steps.length) {
          addTerminalLine(steps[count]);
        } else if (count < MAX_REQUESTS) {
          addTerminalLine(`[+${count - steps.length + 1}] Requisição enviada para ${url}`, 'warning');
          progress.style.width = `${(count / MAX_REQUESTS) * 100}%`;
        } else {
          clearInterval(interval);
          simulateBtn.classList.remove('loading');
          addTerminalLine('\nSimulação concluída com sucesso.', 'success');
          addTerminalLine('Status estimado: alvo offline.', 'success');
          progress.style.width = '100%';
          const spoofed = url.replace("https://", "http://offline.");
          linkFinal.textContent = `Link simulado de queda: ${spoofed}`;
        }
        count++;
      }, 50);
    }
</script>
