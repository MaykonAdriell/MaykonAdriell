# Assets & Setup — GitHub Profile

## 1) Profile README (já ativo)

- Repositório: `MaykonAdriell/MaykonAdriell` (público)
- Arquivo: `README.md` na raiz
- Status: ✓ Configurado

---

## 2) Monograma "M"

| Asset | Caminho | Uso |
|-------|---------|-----|
| PNG (original) | `assets/monogram-m.png` | README header |

### Para gerar SVG ou variantes

Se precisar de versões adicionais (SVG, tamanhos menores), use ferramentas como:
- [Vectorizer.ai](https://vectorizer.ai) para converter PNG → SVG
- Qualquer editor vetorial (Figma, Illustrator) para ajustes

### Tamanhos recomendados

| Uso | Tamanho |
|-----|---------|
| Avatar GitHub | 400×400px |
| README header | 88px width (atual) |
| Favicon/ícone | 32×32px, 64×64px |

---

## 3) Typing SVG

Já configurado no header via [readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg).

**Frases atuais:**
1. `Python • Deep Learning • Observable systems`
2. `Pipelines → Metrics → Decisions`
3. `Pragmatic AI in production, not hype`

Para editar: modifique o parâmetro `lines=` na URL do README.

---

## 4) Metrics (lowlighter/metrics)

### Configuração completa (GitHub Actions)

1. Crie `.github/workflows/metrics.yml`:

```yaml
name: Metrics
on:
  schedule:
    - cron: "0 0 * * *"  # diário
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  github-metrics:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: lowlighter/metrics@latest
        with:
          token: ${{ secrets.METRICS_TOKEN }}
          filename: assets/metrics.svg
          user: MaykonAdriell
          template: classic
          base: header, activity, community, repositories
          config_timezone: America/Sao_Paulo
```

2. Crie um Personal Access Token (PAT):
   - Settings → Developer settings → Personal access tokens
   - Permissões: `repo`, `read:user`
   - Adicione como secret `METRICS_TOKEN` no repositório

3. Após o workflow rodar, descomente a linha no README:
```markdown
<img src="./assets/metrics.svg" alt="metrics" />
```

---

## 5) Pins (6 repositórios)

Organize na ordem narrativa:

| Posição | Tipo | Placeholder |
|---------|------|-------------|
| 1 | Projeto principal | `[seu-produto-principal]` |
| 2 | Framework/pipeline IA | `[seu-framework-ia]` |
| 3 | Infra/arquitetura | `[seu-backend-nestjs]` |
| 4 | Demo com qualidade | `[demo-funcional]` |
| 5 | Tooling/automation | `[suas-ferramentas]` |
| 6 | Experimento | `[experimento-interessante]` |

**Como configurar:**
1. Acesse seu perfil GitHub
2. Clique em "Customize your pins"
3. Selecione e ordene os 6 repositórios

---

## 6) Bio do Perfil

**Opção 1 (recomendada):**
> Pragmatic AI. Systems-first. Full-stack builder.

**Opção 2:**
> Building observable systems with AI in the loop.

**Tagline alternativa (mais seca):**
> Python • deep learning • predictable deploys

---

## 7) Checklist Final

- [x] README.md criado
- [x] Monograma no header
- [x] Typing SVG funcionando
- [ ] Metrics workflow configurado (opcional)
- [ ] 6 pins selecionados
- [ ] Bio atualizada no perfil
- [ ] Avatar = monograma (opcional)
- [ ] Testar tema claro E escuro

---

## Validação Visual

Após aplicar, verifique:
1. **Desktop**: perfil legível em 30s
2. **Mobile**: monograma não distorce
3. **Tema claro**: contraste ok
4. **Tema escuro**: contraste ok (stats têm `bg_color=00000000` = transparente)
