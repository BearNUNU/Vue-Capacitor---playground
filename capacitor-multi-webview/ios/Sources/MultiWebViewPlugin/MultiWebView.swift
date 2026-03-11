import Foundation

@objc public class MultiWebView: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
