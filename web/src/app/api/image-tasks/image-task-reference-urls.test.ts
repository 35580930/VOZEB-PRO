import { afterEach, describe, expect, it } from "vitest";

import { publicImageReferenceRequestUrl } from "./image-task-reference-urls";

const previousKey = process.env.VOZEB_PRO_REFERENCE_ASSET_SIGNING_KEY;

afterEach(() => {
    if (previousKey === undefined) delete process.env.VOZEB_PRO_REFERENCE_ASSET_SIGNING_KEY;
    else process.env.VOZEB_PRO_REFERENCE_ASSET_SIGNING_KEY = previousKey;
});

describe("public image reference request URL", () => {
    it("signs an absolute same-site reference asset before sending it to a provider", async () => {
        process.env.VOZEB_PRO_REFERENCE_ASSET_SIGNING_KEY = "test-signing-key";

        const result = await publicImageReferenceRequestUrl(
            { dataUrl: "", url: "https://vozeb.example/api/reference-assets/permanent/2026/08/19/images/person.png" },
            "http://internal",
            "https://vozeb.example",
            { ownerUserId: "user-one", taskId: "task-one" },
        );

        const url = new URL(result);
        expect(url.origin).toBe("https://vozeb.example");
        expect(url.searchParams.get("purpose")).toBe("provider-read");
        expect(url.searchParams.get("signature")).toBeTruthy();
    });

    it("keeps a genuinely external public image URL unchanged", async () => {
        const result = await publicImageReferenceRequestUrl({ dataUrl: "", url: "https://cdn.example/person.png" }, "http://internal", "https://vozeb.example", { ownerUserId: "user-one", taskId: "task-one" });

        expect(result).toBe("https://cdn.example/person.png");
    });

    it("does not re-sign a reference-looking path hosted by an external site", async () => {
        const externalUrl = "https://cdn.example/api/reference-assets/public/person.png";
        const result = await publicImageReferenceRequestUrl({ dataUrl: "", url: externalUrl }, "http://internal", "https://vozeb.example", { ownerUserId: "user-one", taskId: "task-one" });

        expect(result).toBe(externalUrl);
    });
});
