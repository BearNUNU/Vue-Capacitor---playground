// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorMultiWebview",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapacitorMultiWebview",
            targets: ["MultiWebViewPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "MultiWebViewPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/MultiWebViewPlugin"),
        .testTarget(
            name: "MultiWebViewPluginTests",
            dependencies: ["MultiWebViewPlugin"],
            path: "ios/Tests/MultiWebViewPluginTests")
    ]
)