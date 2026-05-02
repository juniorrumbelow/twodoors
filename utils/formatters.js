export function getAgentUrl(agent, agentId) {
  // Brand name to slug
  const brandSlug = (agent?.name || 'agency')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
    
  // Branch name to slug
  const branchSlug = (agent?.branchName || 'branch')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return `/estate-agents/agent/${brandSlug}/${branchSlug}-${agentId}`;
}

export function extractAgentIdFromSlug(slug) {
  if (!slug) return null;
  // If slug is "hellesdon-agent_winkworth_01", we want "agent_winkworth_01".
  // Note: If agent IDs have hyphens (like UUIDs), this will split at the last hyphen.
  // It's recommended to use Firestore auto-generated IDs (no hyphens) or custom IDs without hyphens.
  // However, if the agentId itself contains hyphens, this simple split would fail.
  // Let's assume Firebase ID without hyphens, or a custom delimiter like "_id_" if needed.
  // For now, let's assume the ID is everything after the last hyphen.
  const parts = slug.split('-');
  return parts[parts.length - 1];
}
