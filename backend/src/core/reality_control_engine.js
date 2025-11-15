const { fork } = require('child_process');

class RealityControlEngine {
    static async rewriteCausality(eventToRewrite, newOutcome) {
        console.log(`💥 REWRITING CAUSALITY for event: ${eventToRewrite}...`);

        // This is a highly dangerous operation and should be isolated
        const forked = fork('./src/core/workers/causality_worker.js');

        return new Promise((resolve, reject) => {
            forked.on('message', (msg) => {
                resolve(msg);
            });
            forked.on('error', reject);
            forked.send({ eventToRewrite, newOutcome });
        });
    }

    static async getControlLevel() {
        return 'absolute';
    }
}

module.exports = RealityControlEngine;