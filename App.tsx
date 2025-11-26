import { useState } from "react";
import { DevGateway } from "./pages/DevGateway";
import { LoginScreen } from "./pages/LoginScreen";
import { Taskboard } from "./pages/Taskboard";
import { FontDisplay } from "./components/design-system/FontDisplay";
import { ColorDisplay } from "./components/design-system/ColorDisplay";
import { BorderRadiusDisplay } from "./components/design-system/BorderRadiusDisplay";
import { BorderDisplay } from "./components/design-system/BorderDisplay";
import { ShadowDisplay } from "./components/design-system/ShadowDisplay";
import { LayoutDisplay } from "./components/design-system/LayoutDisplay";
import { AssetDisplay } from "./components/design-system/AssetDisplay";
import { SpacingDisplay } from "./components/design-system/SpacingDisplay";
import { TransitionDisplay } from "./components/design-system/TransitionDisplay";
import { VariablesDisplay } from "./components/design-system/VariablesDisplay";
import { AuditsDisplay } from "./components/design-system/AuditsDisplay";
import { InitializeAuditSystem } from "./components/design-system/InitializeAuditSystem";
import { ButtonShowcase } from "./components/component-library/ButtonShowcase";
import { InputFieldShowcase } from "./components/component-library/InputFieldShowcase";
import { CardShowcase } from "./components/component-library/CardShowcase";
import { BadgeShowcase } from "./components/component-library/BadgeShowcase";
import { CheckboxShowcase } from "./components/component-library/CheckboxShowcase";
import { RadioShowcase } from "./components/component-library/RadioShowcase";
import { ToggleShowcase } from "./components/component-library/ToggleShowcase";
import { SelectShowcase } from "./components/component-library/SelectShowcase";
import { AvatarShowcase } from "./components/component-library/AvatarShowcase";
import { AlertShowcase } from "./components/component-library/AlertShowcase";
import { TabsShowcase } from "./components/component-library/TabsShowcase";
import { BreadcrumbShowcase } from "./components/component-library/BreadcrumbShowcase";
import { PaginationShowcase } from "./components/component-library/PaginationShowcase";
import { ToastShowcase } from "./components/component-library/ToastShowcase";
import { ModalShowcase } from "./components/component-library/ModalShowcase";
import { LoadingShowcase } from "./components/component-library/LoadingShowcase";
import { ContainerShowcase } from "./components/component-library/ContainerShowcase";
import { GridShowcase } from "./components/component-library/GridShowcase";
import { StackShowcase } from "./components/component-library/StackShowcase";
import { BackupManager } from "./components/BackupManager";
import {
  DESIGN_SYSTEM_CONFIG,
  normalizeTabName,
  getFirstComponentOfCategory,
} from "./config/design-system-config";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    "dev-gateway" | "login" | "design-system" | "taskboard"
  >("dev-gateway");
  const [activeMainTab, setActiveMainTab] = useState<
    "design" | "component" | "variables" | "audits" | "admin"
  >("design");
  const [activeDesignTab, setActiveDesignTab] =
    useState("font");
  const [activeComponentTab, setActiveComponentTab] =
    useState("button");
  const [activeComponentCategory, setActiveComponentCategory] =
    useState("inputs");

  const handleDevGatewayNavigation = (
    screen:
      | "design"
      | "login"
      | "registration"
      | "welcome"
      | "taskboard",
  ) => {
    if (screen === "design") {
      setCurrentScreen("design-system");
    } else if (screen === "login") {
      setCurrentScreen("login");
    } else if (screen === "taskboard") {
      setCurrentScreen("taskboard");
    } else {
      console.log(
        `Navigation to "${screen}" - Screen not yet implemented`,
      );
    }
  };

  // Show Dev Gateway during MVP development
  if (currentScreen === "dev-gateway") {
    return (
      <DevGateway onNavigate={handleDevGatewayNavigation} />
    );
  }

  // If login screen is active, show it
  if (currentScreen === "login") {
    return (
      <LoginScreen
        onNavigateToDesignSystem={() =>
          setCurrentScreen("design-system")
        }
      />
    );
  }

  // If taskboard screen is active, show it
  if (currentScreen === "taskboard") {
    return (
      <Taskboard onNavigate={handleDevGatewayNavigation} />
    );
  }

  const handleDesignTabClick = (
    tab: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setActiveDesignTab(normalizeTabName(tab));
    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleComponentTabClick = (
    tab: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setActiveComponentTab(normalizeTabName(tab));
    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const handleComponentCategoryClick = (
    category: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setActiveComponentCategory(normalizeTabName(category));
    const firstComponent =
      getFirstComponentOfCategory(category);
    setActiveComponentTab(normalizeTabName(firstComponent));
    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const renderDesignSystemContent = () => {
    const sectionTitles =
      DESIGN_SYSTEM_CONFIG.designSystemSectionTitles;

    switch (activeDesignTab) {
      case "font":
        return (
          <div className="p-6">
            <h3 className="mb-4">{sectionTitles.font}</h3>
            <FontDisplay />
          </div>
        );
      case "color + gradients":
        return (
          <div className="p-6">
            <h3 className="mb-4">
              {sectionTitles.colorGradients}
            </h3>
            <ColorDisplay />
          </div>
        );
      case "radius":
        return (
          <div className="p-6">
            <h3 className="mb-4">{sectionTitles.radius}</h3>
            <BorderRadiusDisplay />
          </div>
        );
      case "borders":
        return (
          <div className="p-6">
            <h3 className="mb-4">{sectionTitles.borders}</h3>
            <BorderDisplay />
          </div>
        );
      case "shadow":
        return (
          <div className="p-6">
            <h3 className="mb-4">{sectionTitles.shadow}</h3>
            <ShadowDisplay />
          </div>
        );
      case "layout":
        return (
          <div className="p-6">
            <h3 className="mb-4">{sectionTitles.layout}</h3>
            <LayoutDisplay />
          </div>
        );
      case "logo":
        return (
          <div className="p-6">
            <h3 className="mb-4">{sectionTitles.logo}</h3>
            <AssetDisplay type="logo" />
          </div>
        );
      case "icons":
        return (
          <div className="p-6">
            <h3 className="mb-4">{sectionTitles.icons}</h3>
            <AssetDisplay type="icons" />
          </div>
        );
      case "illustration":
        return (
          <div className="p-6">
            <h3 className="mb-4">
              {sectionTitles.illustration}
            </h3>
            <AssetDisplay type="illustration" />
          </div>
        );
      case "spacing":
        return (
          <div className="p-6">
            <h3 className="mb-4">{sectionTitles.spacing}</h3>
            <SpacingDisplay />
          </div>
        );
      case "transition":
        return (
          <div className="p-6">
            <h3 className="mb-4">{sectionTitles.transition}</h3>
            <TransitionDisplay />
          </div>
        );
      default:
        return null;
    }
  };

  const renderComponentLibraryContent = () => {
    switch (activeComponentTab) {
      case "button":
        return (
          <div className="p-6">
            <ButtonShowcase />
          </div>
        );
      case "input field":
        return (
          <div className="p-6">
            <InputFieldShowcase />
          </div>
        );
      case "card":
        return (
          <div className="p-6">
            <CardShowcase />
          </div>
        );
      case "badge":
        return (
          <div className="p-6">
            <BadgeShowcase />
          </div>
        );
      case "checkbox":
        return (
          <div className="p-6">
            <CheckboxShowcase />
          </div>
        );
      case "radio":
        return (
          <div className="p-6">
            <RadioShowcase />
          </div>
        );
      case "toggle":
        return (
          <div className="p-6">
            <ToggleShowcase />
          </div>
        );
      case "select":
        return (
          <div className="p-6">
            <SelectShowcase />
          </div>
        );
      case "avatar":
        return (
          <div className="p-6">
            <AvatarShowcase />
          </div>
        );
      case "alert":
        return (
          <div className="p-6">
            <AlertShowcase />
          </div>
        );
      case "tabs":
        return (
          <div className="p-6">
            <TabsShowcase />
          </div>
        );
      case "breadcrumb":
        return (
          <div className="p-6">
            <BreadcrumbShowcase />
          </div>
        );
      case "pagination":
        return (
          <div className="p-6">
            <PaginationShowcase />
          </div>
        );
      case "toast":
        return (
          <div className="p-6">
            <ToastShowcase />
          </div>
        );
      case "modal":
        return (
          <div className="p-6">
            <ModalShowcase />
          </div>
        );
      case "loading":
        return (
          <div className="p-6">
            <LoadingShowcase />
          </div>
        );
      case "container":
        return (
          <div className="p-6">
            <ContainerShowcase />
          </div>
        );
      case "grid":
        return (
          <div className="p-6">
            <GridShowcase />
          </div>
        );
      case "stack":
        return (
          <div className="p-6">
            <StackShowcase />
          </div>
        );
      default:
        return (
          <div className="p-6">
            <div
              style={{
                padding: "var(--spacing-2xl)",
                textAlign: "center",
                color: "var(--color-dark-40)",
              }}
            >
              <p>{DESIGN_SYSTEM_CONFIG.labels.comingSoon}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-white)" }}
    >
      {/* Header */}
      <div
        className="px-4 py-6 md:px-8"
        style={{
          borderBottom: "1px solid var(--color-light-100)",
        }}
      >
        {/* Back Arrow + H1 Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-md)",
            marginBottom: "var(--spacing-xl)",
          }}
        >
          <button
            onClick={() => setCurrentScreen("design-system")}
            className="back-button"
            aria-label="Back to Dev Gateway"
          >
            <img
              src="https://euaegjptuiwnaymxvavx.supabase.co/storage/v1/object/public/make-f1d63157-icons/angle-left.svg"
              alt="Back"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
          <h1 style={{ margin: 0 }}>
            Design System & Component Library
          </h1>
        </div>

        {/* Tab Navigation 1 - Main Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveMainTab("design")}
            style={{
              padding: "var(--spacing-md) var(--spacing-lg)",
              borderRadius: "var(--radius-full)",
              transition: "var(--transition-base)",
              backgroundColor:
                activeMainTab === "design"
                  ? "var(--color-dark-100)"
                  : "var(--color-light-40)",
              color:
                activeMainTab === "design"
                  ? "var(--color-white)"
                  : "var(--color-dark-60)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-family-primary)",
            }}
          >
            {DESIGN_SYSTEM_CONFIG.labels.designSystemTab}
          </button>
          <button
            onClick={() => setActiveMainTab("component")}
            style={{
              padding: "var(--spacing-md) var(--spacing-lg)",
              borderRadius: "var(--radius-full)",
              transition: "var(--transition-base)",
              backgroundColor:
                activeMainTab === "component"
                  ? "var(--color-dark-100)"
                  : "var(--color-light-40)",
              color:
                activeMainTab === "component"
                  ? "var(--color-white)"
                  : "var(--color-dark-60)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-family-primary)",
            }}
          >
            {DESIGN_SYSTEM_CONFIG.labels.componentLibraryTab}
          </button>
          <button
            onClick={() => setActiveMainTab("variables")}
            style={{
              padding: "var(--spacing-md) var(--spacing-lg)",
              borderRadius: "var(--radius-full)",
              transition: "var(--transition-base)",
              backgroundColor:
                activeMainTab === "variables"
                  ? "var(--color-dark-100)"
                  : "var(--color-light-40)",
              color:
                activeMainTab === "variables"
                  ? "var(--color-white)"
                  : "var(--color-dark-60)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-family-primary)",
            }}
          >
            {DESIGN_SYSTEM_CONFIG.labels.variablesTab}
          </button>
          <button
            onClick={() => setActiveMainTab("audits")}
            style={{
              padding: "var(--spacing-md) var(--spacing-lg)",
              borderRadius: "var(--radius-full)",
              transition: "var(--transition-base)",
              backgroundColor:
                activeMainTab === "audits"
                  ? "var(--color-dark-100)"
                  : "var(--color-light-40)",
              color:
                activeMainTab === "audits"
                  ? "var(--color-white)"
                  : "var(--color-dark-60)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-family-primary)",
            }}
          >
            {DESIGN_SYSTEM_CONFIG.labels.auditsTab}
          </button>
          <button
            onClick={() => setActiveMainTab("admin")}
            style={{
              padding: "var(--spacing-md) var(--spacing-lg)",
              borderRadius: "var(--radius-full)",
              transition: "var(--transition-base)",
              backgroundColor:
                activeMainTab === "admin"
                  ? "var(--color-dark-100)"
                  : "var(--color-light-40)",
              color:
                activeMainTab === "admin"
                  ? "var(--color-white)"
                  : "var(--color-dark-60)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-family-primary)",
            }}
          >
            Admin
          </button>
        </div>
      </div>

      {/* Sub Navigation and Content */}
      <div className="px-4 md:px-8">
        {activeMainTab === "design" && (
          <>
            {/* Tab Navigation 2 - Design System Sub Tabs */}
            <div
              className="py-4"
              style={{
                borderBottom:
                  "1px solid var(--color-light-100)",
              }}
            >
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {DESIGN_SYSTEM_CONFIG.designSystemTabs.map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={(event) =>
                        handleDesignTabClick(tab, event)
                      }
                      style={{
                        padding:
                          "var(--spacing-sm) var(--spacing-md)",
                        borderRadius: "var(--radius-full)",
                        transition: "var(--transition-base)",
                        backgroundColor:
                          activeDesignTab ===
                          normalizeTabName(tab)
                            ? "var(--color-primary)"
                            : "var(--color-light-40)",
                        color:
                          activeDesignTab ===
                          normalizeTabName(tab)
                            ? "var(--color-white)"
                            : "var(--color-dark-60)",
                        border: "none",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        fontFamily:
                          "var(--font-family-primary)",
                      }}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Design System Content */}
            <div className="py-4">
              {renderDesignSystemContent()}
            </div>
          </>
        )}

        {activeMainTab === "component" && (
          <>
            {/* Tab Navigation 2 - Component Category Tabs */}
            <div
              className="py-4"
              style={{
                borderBottom:
                  "1px solid var(--color-light-100)",
              }}
            >
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {DESIGN_SYSTEM_CONFIG.componentCategories.map(
                  (category) => (
                    <button
                      key={category}
                      onClick={(event) =>
                        handleComponentCategoryClick(
                          category,
                          event,
                        )
                      }
                      style={{
                        padding:
                          "var(--spacing-sm) var(--spacing-md)",
                        borderRadius: "var(--radius-full)",
                        transition: "var(--transition-base)",
                        backgroundColor:
                          activeComponentCategory ===
                          normalizeTabName(category)
                            ? "var(--color-primary)"
                            : "var(--color-light-40)",
                        color:
                          activeComponentCategory ===
                          normalizeTabName(category)
                            ? "var(--color-white)"
                            : "var(--color-dark-60)",
                        border: "none",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        fontFamily:
                          "var(--font-family-primary)",
                      }}
                    >
                      {category}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Tab Navigation 3 - Individual Component Tabs */}
            <div
              className="py-4"
              style={{
                borderBottom:
                  "1px solid var(--color-light-100)",
              }}
            >
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {DESIGN_SYSTEM_CONFIG.componentsByCategory[
                  activeComponentCategory as keyof typeof DESIGN_SYSTEM_CONFIG.componentsByCategory
                ].map((component) => (
                  <button
                    key={component}
                    onClick={(event) =>
                      handleComponentTabClick(component, event)
                    }
                    style={{
                      padding:
                        "var(--spacing-sm) var(--spacing-md)",
                      borderRadius: "var(--radius-full)",
                      transition: "var(--transition-base)",
                      backgroundColor:
                        activeComponentTab ===
                        normalizeTabName(component)
                          ? "var(--color-dark-100)"
                          : "var(--color-light-60)",
                      color:
                        activeComponentTab ===
                        normalizeTabName(component)
                          ? "var(--color-white)"
                          : "var(--color-dark-60)",
                      border: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "14px",
                    }}
                  >
                    {component}
                  </button>
                ))}
              </div>
            </div>

            {/* Component Library Content */}
            <div className="py-4">
              {renderComponentLibraryContent()}
            </div>
          </>
        )}

        {activeMainTab === "variables" && (
          <>
            {/* Variables Content */}
            <div className="py-4">
              <div className="p-6">
                <VariablesDisplay />
              </div>
            </div>
          </>
        )}

        {activeMainTab === "audits" && (
          <>
            {/* Audits Content */}
            <div className="py-4">
              <div className="p-6">
                <AuditsDisplay />
              </div>
            </div>
          </>
        )}

        {activeMainTab === "admin" && (
          <>
            {/* Admin Content */}
            <div className="py-4">
              <BackupManager />
            </div>
          </>
        )}
      </div>

      {/* Custom scrollbar hiding for horizontal scroll */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </div>
  );
}