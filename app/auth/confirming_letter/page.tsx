import React from "react";

import { ClientComponent } from "@/components/ClientComponent";
import { ConfirmingLetterContent } from "@/components/Auth/ConfirmEmail/ConfirmingLetterContent";

export default function Page() {
  return (
    <div className="container">
      <ClientComponent>
        <ConfirmingLetterContent />
      </ClientComponent>
    </div>
  );
}
